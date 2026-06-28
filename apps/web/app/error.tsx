'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 16px' }}>
      <h1 style={{ fontSize: 72, margin: 0, color: 'var(--accent)' }}>500</h1>
      <h2 style={{ margin: '8px 0 16px' }}>Something went wrong</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: 400, margin: '0 auto 24px' }}>
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          padding: '12px 24px',
          background: 'var(--accent)',
          color: 'var(--accent-contrast)',
          border: 'none',
          borderRadius: 999,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
}