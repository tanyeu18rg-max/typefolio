import type { RevealPreset, SiteConfig } from '../lib/config-schema';

interface ContactProps {
  contact: SiteConfig['contact'];
  profile: SiteConfig['profile'];
  reveal: RevealPreset;
}

/** Contact/footer: big headline, email link, socials, copyright line. */
export function Contact({ contact, profile, reveal }: ContactProps) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="contact" aria-label="Contact">
      <h2 className="contact__heading" data-motion={reveal}>
        {contact.heading}
      </h2>
      <a className="contact__email" href={`mailto:${contact.email}`} data-motion={reveal}>
        {contact.email}
      </a>

      <ul className="contact__socials" data-motion={reveal}>
        {contact.socials.map((social) => (
          <li key={social.label}>
            <a href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="contact__legal">
        <p>
          © {year} {profile.name}
        </p>
        <p>
          {profile.location} — {profile.availability}
        </p>
      </div>
    </footer>
  );
}
