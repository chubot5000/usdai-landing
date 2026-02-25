export default function StoryDetailLoading() {
  return (
    <main className="min-h-screen bg-[--color-cream]">
      {/* Navigation area */}
      <div className="h-[100px]" />

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-[60px] lg:px-[100px] pb-[120px]">
        {/* Back link skeleton */}
        <div className="pt-[40px] mb-[40px]">
          <div className="h-[20px] w-[120px] bg-[--color-outline-subtle] rounded animate-pulse" />
        </div>

        {/* Header skeleton */}
        <div className="max-w-[800px] mb-[60px]">
          {/* Tags */}
          <div className="flex gap-2 mb-4">
            <div className="h-[28px] w-[80px] bg-[--color-outline-subtle] rounded-full animate-pulse" />
            <div className="h-[28px] w-[100px] bg-[--color-outline-subtle] rounded-full animate-pulse" />
          </div>

          {/* Title */}
          <div className="h-[52px] w-full bg-[--color-outline-subtle] rounded animate-pulse mb-4" />
          <div className="h-[52px] w-2/3 bg-[--color-outline-subtle] rounded animate-pulse mb-4" />

          {/* Description */}
          <div className="h-[24px] w-full bg-[--color-outline-subtle] rounded animate-pulse mb-2" />
          <div className="h-[24px] w-3/4 bg-[--color-outline-subtle] rounded animate-pulse mb-6" />

          {/* Date */}
          <div className="h-[16px] w-[150px] bg-[--color-outline-subtle] rounded animate-pulse" />
        </div>

        {/* Featured image skeleton */}
        <div className="w-full max-w-[1000px] aspect-[16/9] bg-[--color-outline-subtle] rounded-[10px] animate-pulse mb-[60px]" />

        {/* Body skeleton */}
        <div className="max-w-[728px] space-y-6">
          <div className="h-[20px] w-full bg-[--color-outline-subtle] rounded animate-pulse" />
          <div className="h-[20px] w-full bg-[--color-outline-subtle] rounded animate-pulse" />
          <div className="h-[20px] w-4/5 bg-[--color-outline-subtle] rounded animate-pulse" />
          <div className="h-[20px] w-full bg-[--color-outline-subtle] rounded animate-pulse" />
          <div className="h-[20px] w-3/4 bg-[--color-outline-subtle] rounded animate-pulse" />
          <div className="h-8" />
          <div className="h-[32px] w-1/2 bg-[--color-outline-subtle] rounded animate-pulse" />
          <div className="h-[20px] w-full bg-[--color-outline-subtle] rounded animate-pulse" />
          <div className="h-[20px] w-full bg-[--color-outline-subtle] rounded animate-pulse" />
          <div className="h-[20px] w-2/3 bg-[--color-outline-subtle] rounded animate-pulse" />
        </div>
      </div>
    </main>
  );
}
