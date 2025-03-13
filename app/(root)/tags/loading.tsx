import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>

      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>

      <div className="mt-12 grid gap-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton key={index} className="h-60 w-full rounded-2xl " />
        ))}
      </div>
    </section>
  );
};

export default Loading;
