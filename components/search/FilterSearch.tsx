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

type Props = {
  filters: typeof HomePageFilters;
  className?: string;
};
function FilterSearch({ filters, className }: Props) {
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
          "w-full background-light800_darkgradient   min-h-[56px] border-none focus:ring-offset-0 focus:ring-transparent rounded-[10px]",
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

export default FilterSearch;
