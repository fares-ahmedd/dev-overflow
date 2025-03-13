"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HomePageFilters } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

type Props = {
  filters: typeof HomePageFilters;
  className?: string;
};

function FilterSearchContent({ filters, className }: Props) {
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
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return (
    <Select defaultValue={initialFilter} onValueChange={handleFilter}>
      <SelectTrigger
        className={cn(
          "w-full background-light800_darkgradient min-h-[56px] border-none focus:ring-offset-0 focus:ring-transparent rounded-[10px]",
          className
        )}
      >
        <SelectValue placeholder="Select a filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {filters.map((filter) => (
            <SelectItem
              key={filter.value}
              value={filter.value}
              className="cursor-pointer"
            >
              {filter.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
function FilterSearch(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="block md:hidden">
          <Loader2 className="animate-spin size-6 " />
        </div>
      }
    >
      <FilterSearchContent {...props} />
    </Suspense>
  );
}

export default FilterSearch;
