import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Cairo } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  variable: '--font-accent',
});

export const metadata: Metadata = {
  title: 'BAH.DAN — Premium Elite Technology',
  description: 'Futuristic premium ecommerce platform. Modern Arabic luxury meets cyber premium tech.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${cairo.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
