"use client";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { MAX_BUTTONS } from "@/lib/constants";
import { Suspense } from "react";

type Props = {
  isNext: boolean;
  totalPages: number;
};

function PaginationContent({ isNext, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handleNavigation = (direction: "prev" | "next") => {
    const params = new URLSearchParams(searchParams.toString());

    // Handle previous page navigation
    if (direction === "prev" && currentPage > 1) {
      const newPage = currentPage - 1;

      // Remove the page parameter if navigating to page 1
      if (newPage === 1) {
        params.delete("page");
      } else {
        params.set("page", newPage.toString());
      }

      // Navigate to the new URL
      router.push(`${pathname}?${params.toString()}`);
    }
    // Handle next page navigation
    else if (direction === "next" && isNext) {
      const newPage = currentPage + 1;
      params.set("page", newPage.toString());

      // Navigate to the new URL
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleClickPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pageNumbers = [];

  let startPage = Math.max(1, currentPage - Math.floor(MAX_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_BUTTONS - 1);
  if (endPage - startPage < MAX_BUTTONS - 1) {
    startPage = Math.max(1, endPage - MAX_BUTTONS + 1);
  }
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (!isNext && currentPage === 1) return null;
  return (
    <div className="my-3 flex justify-center gap-3 items-center">
      <Button
        disabled={currentPage <= 1}
        onClick={() => handleNavigation("prev")}
        variant="secondary"
        size="sm"
        className="light-border-2 border flex items-center text-[clamp(10px,0.8rem,12px)]"
      >
        <ArrowLeft /> Prev
      </Button>
      <div className="flex gap-2 items-center">
        {pageNumbers.map((page) => (
          <Button
            key={page}
            size="sm"
            variant={currentPage === page ? "secondary" : "ghost"}
            onClick={() => handleClickPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        variant="secondary"
        size="sm"
        className="light-border-2 border flex min-h-[36px]  items-center text-[clamp(10px,0.8rem,12px)]"
      >
        Next <ArrowRight />
      </Button>
    </div>
  );
}

function Pagination(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="my-4 flex items-center justify-center">
          <Loader2 className="animate-spin size-6 " />
        </div>
      }
    >
      <PaginationContent {...props} />
    </Suspense>
  );
}

export default Pagination;
