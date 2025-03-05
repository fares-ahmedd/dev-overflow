"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { HomePageFilters } from "@/lib/constants";
import { Button } from "../ui/button";

function HomeFilterButtons() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") || "all";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value !== "all") {
      params.set("filter", value);
    } else {
      params.delete("filter");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap w-full  max-md:hidden">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          variant={initialFilter === filter.value ? "default" : "outline"}
          size={"sm"}
          className={"body-medium rounded-lg "}
          onClick={() => handleFilter(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilterButtons;
