import './globals.css';
import { Inter } from 'next/font/google';
import Providers from '@/Providers';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog App',
  description: 'Challenge 10 Blog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <main className='min-h-screen bg-white text-black p-4'>
            {children}
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
