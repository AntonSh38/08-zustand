import { Metadata } from 'next';
import css from '../components/NotFound/NotFound.module.css';

export const metadata: Metadata = {
  title: 'Page Not Found - NoteHub',
  description:
    'The page you are looking for could not be found. Return to NoteHub to manage and organize your notes easily.',
  openGraph: {
    title: 'Page Not Found - NoteHub',
    description:
      'The requested page could not be found on NoteHub. Go back to the homepage to continue managing your notes.',
    url: 'https://08-zustand-six-blue.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 page not found',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Not Found - NoteHub',
    description:
      'The requested page could not be found on NoteHub. Return to the homepage and continue managing your notes.',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
