import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '600', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin'],
});

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['400', '700'],
//   variable: '--font-roboto',
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: 'NoteHub App',
  description:
    'NoteHub is a fast and modern note-taking web app. Create, edit, and filter notes by tags, organize your ideas, and preview details instantly without page reloads',
  openGraph: {
    title: 'NoteHub App',
    description:
      'NoteHub is a fast and modern note-taking web app. Create, edit, and filter notes by tags, organize your ideas, and preview details instantly without page reloads',
    url: 'https://08-zustand-six-blue.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'note title',
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
