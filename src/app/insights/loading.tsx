export default function StoriesLoading() {
  return (
    <main className="relative flex w-full flex-1 flex-col items-center text-black bg-[--color-cream] overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-dotted opacity-30" />

      {/* Navigation placeholder */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px] w-full">
        <div className="h-[72px] md:h-[98px]" />
      </div>

      <div className="flex z-10 flex-col flex-wrap flex-1 gap-10 items-center p-4 py-12 md:py-20 w-full max-w-7xl">
        {/* Featured Image Skeleton */}
        <div className="w-full">
          <div className="w-full md:min-h-[500px] aspect-video bg-[--color-outline-subtle] animate-pulse" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex gap-2 w-full justify-start">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-[32px] w-[80px] bg-[--color-outline-subtle] rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Cards Grid Skeleton */}
        <div className="flex overflow-y-hidden justify-center w-full flex-1">
          <div className="grid grid-cols-1 gap-x-3 gap-y-12 md:gap-y-16 md:gap-x-5 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col gap-2 md:gap-4">
                <div className="aspect-video w-full min-w-[300px] bg-[--color-outline-subtle] animate-pulse" />
                <div className="h-[16px] w-[200px] bg-[--color-outline-subtle] rounded animate-pulse" />
                <div className="h-[28px] w-full bg-[--color-outline-subtle] rounded animate-pulse" />
                <div className="h-[16px] w-3/4 bg-[--color-outline-subtle] rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
