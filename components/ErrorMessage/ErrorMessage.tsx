import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className={css.text}>
      Could not fetch note details. {message && <span>{message}</span>}
    </p>
  );
}
