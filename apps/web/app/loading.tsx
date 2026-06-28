export default function Loading() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 16px' }}>
      <div
        style={{
          width: 40,
          height: 40,
          border: '4px solid var(--border)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          margin: '0 auto 16px',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}