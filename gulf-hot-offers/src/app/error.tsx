'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-6xl">⚠️</p>
      <h1 className="mt-4 text-2xl font-black text-ink">Something went wrong</h1>
      <p className="mt-1 text-sm text-ink-muted">An unexpected error occurred while loading this page.</p>
      <button onClick={reset} className="btn-primary mt-6">Try again</button>
    </div>
  );
}
