export function PostCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="aspect-[16/10] skeleton" />
      <div className="p-4 sm:p-5 space-y-3">
        <div className="h-3 w-16 skeleton" />
        <div className="space-y-2">
          <div className="h-5 w-full skeleton" />
          <div className="h-5 w-3/4 skeleton" />
        </div>
        <div className="h-3 w-full skeleton" />
        <div className="h-3 w-2/3 skeleton" />
        <div className="flex justify-between pt-2">
          <div className="h-3 w-20 skeleton" />
          <div className="h-3 w-16 skeleton" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="aspect-[16/9] md:aspect-[21/9] skeleton" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 space-y-3">
        <div className="h-5 w-24 skeleton" />
        <div className="h-8 w-3/4 skeleton" />
        <div className="h-4 w-1/2 skeleton hidden sm:block" />
        <div className="flex gap-3">
          <div className="h-3 w-20 skeleton" />
          <div className="h-3 w-16 skeleton" />
        </div>
      </div>
    </div>
  );
}

export function CompactCardSkeleton() {
  return (
    <div className="flex gap-4">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg skeleton shrink-0" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-3 w-16 skeleton" />
        <div className="h-4 w-full skeleton" />
        <div className="h-4 w-2/3 skeleton" />
        <div className="h-3 w-20 skeleton" />
      </div>
    </div>
  );
}

export function TrendingCardSkeleton({ rank }: { rank: number }) {
  return (
    <div className="flex gap-4">
      <span className="text-4xl sm:text-5xl font-black text-[var(--bg-tertiary)] shrink-0 leading-none w-12 text-right">
        {String(rank).padStart(2, "0")}
      </span>
      <div className="flex-1 border-l border-[var(--border-color)] pl-4 space-y-2">
        <div className="h-3 w-16 skeleton" />
        <div className="h-4 w-full skeleton" />
        <div className="h-4 w-2/3 skeleton" />
        <div className="h-3 w-24 skeleton" />
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="container-narrow py-8 space-y-6">
      <div className="h-5 w-24 skeleton" />
      <div className="space-y-3">
        <div className="h-10 w-full skeleton" />
        <div className="h-10 w-3/4 skeleton" />
      </div>
      <div className="flex gap-4">
        <div className="h-4 w-32 skeleton" />
        <div className="h-4 w-24 skeleton" />
        <div className="h-4 w-20 skeleton" />
      </div>
      <div className="aspect-[16/9] skeleton" />
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-4 skeleton"
            style={{ width: `${70 + Math.random() * 30}%` }}
          />
        ))}
      </div>
    </div>
  );
}
