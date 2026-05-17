import { PostCardSkeleton } from "@/components/ui/Skeletons";

export default function CategoryLoading() {
  return (
    <div className="container-main py-8 sm:py-12">
      <div className="mb-8 sm:mb-12">
        <div className="h-12 w-48 skeleton mb-3" />
        <div className="h-5 w-80 skeleton" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
