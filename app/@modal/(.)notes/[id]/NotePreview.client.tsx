'use client';

import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';
import { useQuery } from '@tanstack/react-query';
import css from '../../../../components/NotePreview/NotePreview.module.css';
import { useRouter } from 'next/navigation';

interface Props {
  noteId: string;
}

export default function NotePreview({ noteId }: Props) {
  const router = useRouter();

  const { data: note, isLoading } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading || !note) {
    return (
      <Modal onClose={handleClose}>
        <div>
          <p>Loading...</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>

        <p className={css.content}>{note.content}</p>

        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>

        <div>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <div>
          <button className={css.backBtn} onClick={handleClose}>
            ← Back
          </button>
        </div>
      </div>
    </Modal>
  );
}
