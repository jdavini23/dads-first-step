import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/Sonner';
import { AuthInitializer } from '@/components/auth/AuthInitializer';
import { APP_NAME, APP_DESCRIPTION } from './constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('RootLayout rendering', { children });
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script 
          dangerouslySetInnerHTML={{
            __html: `console.log('Layout script executing');`
          }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-body antialiased pt-20`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthInitializer />
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
        <script 
          dangerouslySetInnerHTML={{
            __html: `console.log('Body script executing');`
          }}
        />
      </body>
    </html>
  );
}
