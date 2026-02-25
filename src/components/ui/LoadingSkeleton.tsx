export default function LoadingSkeleton() {
  return (
    <div className="w-full h-full min-h-[500px] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
        <div className="h-2 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
