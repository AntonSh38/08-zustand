interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p>Could not fetch note details. {message && <span>{message}</span>}</p>
  );
}
