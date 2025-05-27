import { useEffect } from "react";

const RetryButton = () => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'r') location.reload();
  }

  return (
    <a href="#" onClick={() => location.reload()}>Retry</a>
  );
}

export default RetryButton;
