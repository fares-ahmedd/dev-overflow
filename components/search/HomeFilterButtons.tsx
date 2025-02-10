"use client";
import { HomePageFilters } from "@/lib/constants";
import { Button } from "../ui/button";

function HomeFilterButtons() {
  const isActive = false;
  return (
    <div className="w-full space-x-3  max-md:hidden">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          variant={
            isActive || filter.value === "newest" ? "default" : "outline"
          }
          size={"sm"}
          className={"body-medium rounded-lg "}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilterButtons;
