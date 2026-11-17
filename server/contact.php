<?php
/**
 * CHTS contact form endpoint (PHP 8+, works on standard cPanel hosting).
 *
 * 1. Upload this file to your web root, e.g. https://chtsltd.com/api/contact.php
 * 2. Set VITE_CONTACT_ENDPOINT=/api/contact.php in .env and rebuild.
 * 3. Adjust the settings below. For reliable delivery prefer SMTP via your
 *    host's mail settings (mail() relies on the server's sendmail).
 */

declare(strict_types=1);

const TO_EMAIL      = 'contact@chtsltd.com';
const FROM_EMAIL    = 'no-reply@chtsltd.com';   // must be a mailbox on your domain
const ALLOWED_ORIGINS = ['https://chtsltd.com', 'https://www.chtsltd.com', 'http://localhost:5173', 'http://localhost:4173'];
const RATE_LIMIT_SECONDS = 30;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && in_array($origin, ALLOWED_ORIGINS, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
}
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') { http_response_code(204); exit; }

function respond(int $code, array $body): never {
    http_response_code($code);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') respond(405, ['success' => false, 'message' => 'Method not allowed.']);

$raw = file_get_contents('php://input') ?: '';
if (strlen($raw) > 20000) respond(413, ['success' => false, 'message' => 'Message too large.']);
$data = json_decode($raw, true);
if (!is_array($data)) $data = $_POST;

$clean = static fn($v, int $max = 500): string => trim(mb_substr(str_replace(["\r", "\0"], '', (string)($v ?? '')), 0, $max));
$name    = $clean($data['name'] ?? '', 120);
$email   = $clean($data['email'] ?? '', 160);
$phone   = $clean($data['phone'] ?? '', 40);
$company = $clean($data['company'] ?? '', 160);
$service = $clean($data['service'] ?? '', 120);
$budget  = $clean($data['budget'] ?? '', 60);
$timeline = $clean($data['timeline'] ?? '', 60);
$details = $clean($data['details'] ?? '', 5000);

if (!empty($data['website'])) respond(200, ['success' => true]); // honeypot

$errors = [];
if (mb_strlen($name) < 2) $errors['name'] = 'Name is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'A valid email is required.';
if ($phone !== '' && !preg_match('/^[+()\-\s\d]{6,20}$/', $phone)) $errors['phone'] = 'Invalid phone number.';
if (mb_strlen($details) < 20) $errors['details'] = 'Please describe your project (20+ characters).';
if ($errors) respond(422, ['success' => false, 'message' => 'Please check the highlighted fields.', 'errors' => $errors]);

// very small per-IP rate limit
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$lock = sys_get_temp_dir() . '/chts_contact_' . md5($ip);
if (is_file($lock) && (time() - (int)filemtime($lock)) < RATE_LIMIT_SECONDS) {
    respond(429, ['success' => false, 'message' => 'Please wait a moment before sending another message.']);
}
@touch($lock);

$subject = 'New project enquiry — ' . preg_replace('/[^\p{L}\p{N} .\-]/u', '', $name);
$lines = [
    "Name:    $name",
    "Email:   $email",
    "Phone:   " . ($phone ?: '—'),
    "Company: " . ($company ?: '—'),
    "Service: " . ($service ?: '—'),
    "Budget:  " . ($budget ?: '—'),
    "Timeline: " . ($timeline ?: '—'),
    '',
    $details,
    '',
    '— Sent from the chtsltd.com contact form (' . date('c') . ", IP $ip)",
];
$headers = [
    'From: CHTS Website <' . FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail(TO_EMAIL, '=?UTF-8?B?' . base64_encode($subject) . '?=', implode("\n", $lines), implode("\r\n", $headers), '-f' . FROM_EMAIL);
if (!$sent) respond(500, ['success' => false, 'message' => 'The message could not be delivered.']);
respond(200, ['success' => true]);
