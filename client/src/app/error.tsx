'use client';

import { ReactNode } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
  children?: ReactNode;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h2>Chunk Load Error</h2>
      {error && <p>Error: {error.message}</p>}
      <button onClick={() => window.location.reload()}>
        Reload Page
      </button>
      {/* Optional reset button */}
      <button onClick={reset} style={{ marginLeft: '10px' }}>
        Try Again
      </button>
    </div>
  );
}