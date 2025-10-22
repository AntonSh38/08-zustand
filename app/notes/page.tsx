import { fetchNotes } from '@/lib/api';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import NoteClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '' }),
  });

  const dehydratedState = dehydrate(queryClient);

  return <NoteClient dehydrate={dehydratedState} initialPage={1} />;
}
