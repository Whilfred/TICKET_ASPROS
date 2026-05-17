import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'ASPROS - Billetterie et Collecte Solidaire',
  description: 'Plateforme africaine de billetterie, événements, concerts, cinéma et collectes solidaires.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navigation />
          <main className="animate-fade-in">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
