import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Shimmer effect skeleton with animation
const ShimmerSkeleton = ({ className }: { className?: string }) => (
  <Skeleton className={cn("animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]", className)} />
);

export const ProductCardSkeleton = () => (
  <div className="bg-card rounded-xl overflow-hidden border border-border">
    <div className="relative aspect-square overflow-hidden">
      <ShimmerSkeleton className="w-full h-full" />
      {/* Category badge skeleton */}
      <div className="absolute bottom-2 left-2">
        <ShimmerSkeleton className="h-4 w-14 rounded-full" />
      </div>
      {/* Heart button skeleton */}
      <div className="absolute top-2 right-2">
        <ShimmerSkeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
    <div className="p-2.5 sm:p-3 space-y-2">
      <ShimmerSkeleton className="h-3.5 w-4/5" />
      <ShimmerSkeleton className="h-3 w-1/2" />
      <div className="flex items-center justify-between pt-1">
        <ShimmerSkeleton className="h-4 w-16" />
        <ShimmerSkeleton className="h-7 w-14 rounded-md" />
      </div>
    </div>
  </div>
);

export const RecommendedCardSkeleton = () => (
  <div className="bg-card rounded-xl overflow-hidden border border-border">
    <div className="aspect-square relative overflow-hidden">
      <ShimmerSkeleton className="w-full h-full" />
      {/* Cart button skeleton */}
      <div className="absolute bottom-1.5 right-1.5 md:bottom-2 md:right-2">
        <ShimmerSkeleton className="h-7 w-7 md:h-8 md:w-8 rounded-md" />
      </div>
    </div>
    <div className="p-2.5 md:p-4 space-y-1.5">
      <ShimmerSkeleton className="h-4 w-4/5" />
      <ShimmerSkeleton className="h-3 w-3/5" />
      <ShimmerSkeleton className="h-4 w-20 mt-1" />
    </div>
  </div>
);

export const StoreCardSkeleton = () => (
  <div className="bg-card rounded-xl overflow-hidden border border-border">
    {/* Cover image */}
    <ShimmerSkeleton className="h-24 sm:h-28 w-full" />
    <div className="relative p-3 pt-0">
      {/* Avatar */}
      <div className="relative -mt-6 mb-2">
        <ShimmerSkeleton className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-card" />
      </div>
      <ShimmerSkeleton className="h-3.5 w-3/4 mb-1" />
      <ShimmerSkeleton className="h-3 w-full mb-2" />
      {/* Location */}
      <div className="flex items-center gap-1 mb-2">
        <ShimmerSkeleton className="h-3 w-3 rounded-full" />
        <ShimmerSkeleton className="h-3 w-20" />
      </div>
      <div className="flex items-center justify-between">
        <ShimmerSkeleton className="h-3 w-16" />
        <ShimmerSkeleton className="h-7 w-12 rounded-md" />
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const RecommendedGridSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <RecommendedCardSkeleton key={i} />
    ))}
  </div>
);

export const StoreGridSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <StoreCardSkeleton key={i} />
    ))}
  </div>
);

// Categories section skeleton
export const CategoriesSkeleton = () => (
  <div className="py-12 md:py-16">
    <div className="container px-4">
      <div className="flex items-center justify-between mb-6">
        <ShimmerSkeleton className="h-7 w-32" />
      </div>
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-shrink-0">
            <ShimmerSkeleton className="h-10 w-28 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Hero section skeleton
export const HeroSkeleton = () => (
  <div className="relative min-h-[80vh] flex items-center justify-center py-20">
    <div className="container px-4 text-center space-y-6">
      <ShimmerSkeleton className="h-6 w-40 mx-auto rounded-full" />
      <ShimmerSkeleton className="h-12 md:h-16 w-3/4 mx-auto" />
      <ShimmerSkeleton className="h-6 w-2/3 mx-auto" />
      <ShimmerSkeleton className="h-12 w-full max-w-xl mx-auto rounded-lg" />
      <div className="flex gap-4 justify-center pt-4">
        <ShimmerSkeleton className="h-12 w-36 rounded-lg" />
        <ShimmerSkeleton className="h-12 w-36 rounded-lg" />
      </div>
    </div>
  </div>
);
