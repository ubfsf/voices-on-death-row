'use client';

/**
 * Global error boundary — last-resort handler when even the root layout fails.
 * Must render its own <html>/<body> since the root layout is not available.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Something went wrong</h1>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 2rem',
              cursor: 'pointer',
              background: '#1c1917',
              color: '#fff',
              border: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              fontSize: '0.65rem',
            }}
          >
            Try again
          </button>
          {/* error.digest available for support correlation */}
          <span hidden>{error.digest}</span>
        </div>
      </body>
    </html>
  );
}
