import { motion } from 'motion/react';
import { Link } from 'react-router';
import type { ReactNode, MouseEventHandler } from 'react';
import { cn } from '../../utils/cn';

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'ghost' | 'text';
  size?: 'md' | 'lg';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: MouseEventHandler;
  className?: string;
  arrow?: boolean;
  external?: boolean;
};

const MotionLink = motion.create(Link);

/** Pill button with a rolling label micro-interaction (Motion). */
export function Button({ children, to, href, variant = 'primary', size = 'md', type = 'button', disabled, onClick, className, arrow = true, external }: Props) {
  const cls = cn('btn', `btn--${variant}`, `btn--${size}`, className);
  const inner = (
    <>
      <span className="btn__label" data-text={typeof children === 'string' ? children : undefined}>
        <span>{children}</span>
      </span>
      {arrow && (
        <span className="btn__icon" aria-hidden>
          <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      )}
    </>
  );
  const motionProps = { whileTap: { scale: 0.97 }, transition: { type: 'spring' as const, stiffness: 400, damping: 25 } };
  if (to) return <MotionLink to={to} className={cls} onClick={onClick} {...motionProps}>{inner}</MotionLink>;
  if (href)
    return (
      <motion.a href={href} className={cls} onClick={onClick} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...motionProps}>
        {inner}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </motion.a>
    );
  return <motion.button type={type} className={cls} disabled={disabled} onClick={onClick} {...motionProps}>{inner}</motion.button>;
}
