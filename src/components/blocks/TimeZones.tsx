import { useEffect, useState } from 'react';
import { SectionHead } from '../ui/SectionHead';
import { clientZones, officeHours } from '../../data';

function offsetHours(zone: string, at = new Date()) {
  const part = new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'shortOffset' }).formatToParts(at).find((p) => p.type === 'timeZoneName')?.value ?? 'GMT';
  const m = part.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!m) return 0;
  return (m[1] === '-' ? -1 : 1) * (Number(m[2]) + Number(m[3] ?? 0) / 60);
}
const hhmm = (h: number) => {
  const x = ((h % 24) + 24) % 24;
  return `${String(Math.floor(x)).padStart(2, '0')}:${String(Math.round((x % 1) * 60)).padStart(2, '0')}`;
};

/** Shows Dhaka office hours converted into each client time zone, with overlap against a 9–18 local day. */
export function TimeZones({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const dhakaNow = new Intl.DateTimeFormat('en-GB', { timeZone: officeHours.timeZone, hour: '2-digit', minute: '2-digit', weekday: 'short' }).format(now);

  const rows = clientZones.map((z) => {
    const diff = offsetHours(z.zone, now) - officeHours.utcOffset;
    const open = officeHours.openHour + diff;
    const close = officeHours.closeHour + diff;
    const overlap = Math.max(0, Math.min(close, 18) - Math.max(open, 9));
    return { ...z, open, close, overlap };
  });

  const body = (
    <div className="tz">
      <div className="tz__now">
        <span className="tz__dot" aria-hidden />
        <span>
          Dhaka now: <strong>{dhakaNow}</strong> · Office hours {officeHours.days}, {hhmm(officeHours.openHour)}–{hhmm(officeHours.closeHour)} (GMT+6)
        </span>
      </div>
      <table className="tz__table">
        <caption className="sr-only">Our office hours in your time zone</caption>
        <thead>
          <tr>
            <th scope="col">Your location</th>
            <th scope="col">Our hours, your time</th>
            <th scope="col">Overlap with your 9–6</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.zone}>
              <th scope="row">{r.label}</th>
              <td>
                {hhmm(r.open)}–{hhmm(r.close)}
              </td>
              <td>
                <span className="tz__bar" aria-hidden>
                  <i style={{ width: `${(r.overlap / 9) * 100}%` }} />
                </span>
                {r.overlap > 0 ? `${r.overlap % 1 ? r.overlap.toFixed(1) : r.overlap} hrs` : 'Async + scheduled calls'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (compact) return body;
  return (
    <section className="section section--tight" aria-labelledby="tz-title">
      <div className="container">
        <SectionHead eyebrow="Across time zones" titleId="tz-title" title="Working *with* you, wherever you are." align="split" lead="Daily progress updates arrive before your morning starts, and calls are booked inside the hours we share." />
        {body}
      </div>
    </section>
  );
}
