import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { SoundToggle } from './SoundToggle';
import { navLinks } from './navLinks';
import { contact, socials } from '../../data';
import { cn } from '../../utils/cn';

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    // the header always stays visible; only the "scrolled" state is tracked
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
      }
      if (e.key === 'Tab' && menuRef.current) {
        const f = menuRef.current.querySelectorAll<HTMLElement>('a,button');
        const first = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    setTimeout(() => menuRef.current?.querySelector<HTMLElement>('a')?.focus(), 50);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className={cn('nav', scrolled && 'is-scrolled')}>
        <div className="nav__inner">
          <Logo />
          <nav aria-label="Primary" className="nav__links">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => cn('nav__link', isActive && 'is-active')}>
                <span className="nav__roll">
                  <span data-text={l.label}>{l.label}</span>
                </span>
              </NavLink>
            ))}
          </nav>
          <div className="nav__actions">
            <SoundToggle />
            <Button to="/contact" size="md" className="nav__cta">Let’s Talk</Button>
            <button ref={burgerRef} type="button" className={cn('burger', open && 'is-open')} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
              <span /> <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="menu__links">
              {[{ to: '/', label: 'Home' }, ...navLinks, { to: '/contact', label: 'Contact' }].map((l, i) => (
                <motion.div key={l.to} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                  <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => cn('menu__link', isActive && 'is-active')}>
                    <span className="menu__num">{String(i + 1).padStart(2, '0')}</span>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="menu__foot">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <div className="menu__socials">
                {socials.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
