import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub App',
  description:
    'NoteHub is a fast and modern note-taking web app. Create, edit, and filter notes by tags, organize your ideas, and preview details instantly without page reloads',
  openGraph: {
    title: 'NoteHub App',
    description:
      'NoteHub is a fast and modern note-taking web app. Create, edit, and filter notes by tags, organize your ideas, and preview details instantly without page reloads',
    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
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
      <body>
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
