import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import FilteredNotesClient from './Notes.client';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug: category } = await params;

  const tag: NoteTag | undefined =
    category[0] && category[0] !== 'all' ? (category[0] as NoteTag) : undefined;

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
