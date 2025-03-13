import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 ">Saved Questions</h1>

      <div className="mt-11 flex justify-between items-center gap-5 max-md:flex-col">
        <Skeleton className="h-14 w-full md:w-1/2" />
        <Skeleton className="h-14 w-full  md:w-1/2 " />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton key={index} className="h-[356px]"></Skeleton>
        ))}
      </div>
    </>
  );
};

export default Loading;
