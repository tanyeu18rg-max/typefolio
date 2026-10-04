import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import type { CSSProperties } from 'react';
import { config } from '@/lib/config';
import { getPreset, tokensToCssVars } from '@/lib/tokens';
import { Navigation } from '@/components/Navigation';
import { MotionInit } from '@/components/MotionInit';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  title: config.meta.title,
  description: config.meta.description,
  metadataBase: new URL(config.meta.url),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const preset = getPreset(config.tokens.preset);

  return (
    <html lang="en" style={tokensToCssVars(preset) as CSSProperties} className={archivo.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionInit motion={config.motion} />
        <Navigation profile={config.profile} />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
