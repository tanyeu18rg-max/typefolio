'use client';

import { useState } from 'react';
import type { SiteConfig } from '../lib/config-schema';

interface NavigationProps {
  profile: SiteConfig['profile'];
}

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Awards', href: '#awards' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Fixed top bar: name left, menu button right. The button opens the
 * fullscreen overlay menu — the playful "experiment" layer — with anchor
 * links and the availability note from config.
 */
export function Navigation({ profile }: NavigationProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={`site-nav${open ? ' is-open' : ''}`}>
        <a href="#top" className="site-nav__name" onClick={() => setOpen(false)}>
          {profile.name}
        </a>
        <button
          type="button"
          className="site-nav__toggle"
          aria-expanded={open}
          aria-controls="menu-overlay"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="site-nav__toggle-label">{open ? 'Close' : 'Menu'}</span>
          <span className={`site-nav__burger${open ? ' is-open' : ''}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </header>

      <div id="menu-overlay" className={`menu-overlay${open ? ' is-open' : ''}`} inert={!open}>
        <nav aria-label="Primary">
          <ul className="menu-overlay__list">
            {LINKS.map((link, index) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="menu-overlay__link"
                >
                  <span className="menu-overlay__index">0{index + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="menu-overlay__meta">
          {profile.availability} — {profile.location}
        </p>
      </div>
    </>
  );
}
