export default function Loading() {
  return (
    <div className="py-6">
      <div className="mb-4 h-40 animate-pulse rounded-2xl bg-surface-border/60" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="aspect-square animate-pulse bg-surface-border/60" />
            <div className="space-y-2 p-3">
              <div className="h-3 w-3/4 animate-pulse rounded bg-surface-border/60" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-surface-border/60" />
              <div className="h-5 w-2/3 animate-pulse rounded bg-surface-border/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
