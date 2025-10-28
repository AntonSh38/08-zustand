import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import FilteredNotesClient from './Notes.client';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];
  return {
    title: category === 'all' ? 'All Notes' : `Notes ${category}`,
    description:
      category === 'all'
        ? 'Browse all notes available in NoteHub.'
        : `View notes catigorized under the ${category} tag`,
    openGraph: {
      title: category === 'all' ? 'All Notes' : `Notes ${category}`,
      description:
        category === 'all'
          ? 'Browse all notes available in NoteHub.'
          : `View notes catigorized under the ${category} tag`,
      url: `https://08-zustand-six-blue.vercel.app/notes/filter/${category}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Note ${category}`,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const category = slug[0];

  const tag: NoteTag | undefined =
    category && category !== 'all' ? (category as NoteTag) : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag ?? 'all'],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
        ...(tag ? { tag } : {}),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilteredNotesClient tag={tag ?? 'all'} />
    </HydrationBoundary>
  );
}
