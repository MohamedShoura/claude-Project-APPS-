import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-6xl">🧭</p>
      <h1 className="mt-4 text-2xl font-black text-ink">404 — Page not found</h1>
      <p className="mt-1 text-sm text-ink-muted">The deal you’re looking for may have expired or moved.</p>
      <Link href="/" className="btn-primary mt-6">Back to home</Link>
    </div>
  );
}
