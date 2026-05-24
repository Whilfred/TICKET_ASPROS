import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { NavigationHeader, NavigationTabBar } from '@/components/Navigation';
import { SimulatorShell } from '@/components/SimulatorShell';

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
          <SimulatorShell>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', position: 'relative', overflow: 'hidden' }}>
              <NavigationHeader />
              <main className="app-scrollbar animate-fade-in" style={{ flex: 1, overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column', paddingBottom: '20px' }}>
                {children}
              </main>
              <NavigationTabBar />
            </div>
          </SimulatorShell>
        </ThemeProvider>
      </body>
    </html>
  );
}


