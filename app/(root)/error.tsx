"use client";

import { Button } from "@/components/ui/button";

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}
function ErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center my-8 ">
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-lg text-red-500 mb-4">{error.message}</p>
      <Button onClick={reset} variant={"outline"}>
        Try Again
      </Button>
    </div>
  );
}

export default ErrorComponent;
