import { PostCardSkeleton, HeroSkeleton } from "@/components/ui/Skeletons";

export default function HomeLoading() {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero Skeleton */}
      <div className="container-main mt-6 sm:mt-8">
        <HeroSkeleton />
      </div>

      {/* Latest News Skeleton */}
      <div className="container-main">
        <div className="h-8 w-48 skeleton mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
