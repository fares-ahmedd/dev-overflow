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
  return (
    <Select>
      <SelectTrigger
        className={cn(
          "w-full background-light800_darkgradient  min-h-[56px] border-none focus:ring-offset-0 focus:ring-transparent rounded-[10px]",
          className
        )}
      >
        <SelectValue placeholder="Select a filter" />
      </SelectTrigger>
      <SelectContent className="background-light800_darkgradient ">
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

  //   return (
  //     <div className="w-full space-x-3">
  //       {filters.map((filter) => (
  //         <Button key={filter.value} variant={"secondary"} size={"sm"}>
  //           {filter.name}
  //         </Button>
  //       ))}
  //     </div>
  //   );
}

export default FilterSearch;
