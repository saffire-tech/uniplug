import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => (
  <div className="bg-card rounded-xl overflow-hidden border border-border w-[calc(50%-6px)] sm:w-auto">
    <Skeleton className="aspect-square w-full" />
    <div className="p-2.5 sm:p-3 space-y-2">
      <Skeleton className="h-3.5 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex items-center justify-between pt-1">
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  </div>
);

export const StoreCardSkeleton = () => (
  <div className="bg-card rounded-xl overflow-hidden border border-border w-[calc(50%-6px)] sm:w-auto">
    <Skeleton className="h-24 sm:h-28 w-full" />
    <div className="p-3 pt-0">
      <div className="relative -mt-6 mb-2">
        <Skeleton className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg" />
      </div>
      <Skeleton className="h-3.5 w-3/4 mb-1" />
      <Skeleton className="h-3 w-full mb-2" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="flex flex-wrap gap-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const StoreGridSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="flex flex-wrap gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <StoreCardSkeleton key={i} />
    ))}
  </div>
);
