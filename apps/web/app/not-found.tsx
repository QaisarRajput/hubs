import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 16px' }}>
      <h1 style={{ fontSize: 72, margin: 0, color: 'var(--accent)' }}>404</h1>
      <h2 style={{ margin: '8px 0 16px' }}>Page not found</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: 400, margin: '0 auto 24px' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'var(--accent)',
          color: 'var(--accent-contrast)',
          borderRadius: 999,
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}