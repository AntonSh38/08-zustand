import { Metadata } from 'next';
import css from '../components/NotFound/NotFound.module.css';

export const metadata: Metadata = {
  title: 'NoteHub page not found',
  description:
    'The requested page could not be found on NoteHub. Please check the URL or return to the homepage.',
  openGraph: {
    title: 'NoteHub page not found',
    description:
      'The requested page could not be found on NoteHub. Please check the URL or return to the homepage.',
    url: 'https://08-zustand-gt8gtx584-antonsh38s-projects.vercel.app/',
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
