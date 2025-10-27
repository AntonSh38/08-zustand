'use client';

import ErrorMessage from '@/app/error';
import Loader from '@/app/loading';
import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '@/components/NoteList/NoteList';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from '../../Notes.module.css';
import { Toaster } from 'react-hot-toast';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

interface Props {
  tag: NoteTag | 'all';
}

export default function FilteredNotesClient({ tag }: Props) {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [debounceedSearch] = useDebounce(searchQuery, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', page, debounceedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page: page,
        perPage: 12,
        search: debounceedSearch,
        tag: tag === 'all' ? undefined : tag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const handleNoteCreated = (): void => {
    setIsModalOpen(false);
    setPage(1);
  };

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage error={error as Error} />;
  }

  return (
    <>
      <div className={css.app}>
        <Toaster position="top-center" />

        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}

          <button
            type="button"
            className={css.button}
            onClick={handleOpenModal}
          >
            Create note +
          </button>
        </header>

        {isLoading && <Loader />}
        {isError && error && <ErrorMessage error={error} />}

        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}

        {!isLoading && !isError && notes.length === 0 && (
          <p className={css.emptyMessage}>
            {searchQuery ? 'No notes found for your search' : null}
          </p>
        )}

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <NoteForm
              onSuccess={handleNoteCreated}
              onCancel={handleCloseModal}
            />
          </Modal>
        )}
      </div>
    </>
  );
}
