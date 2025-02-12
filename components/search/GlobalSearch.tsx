import Image from "next/image";
import { Input } from "../ui/input";

function GlobalSearch() {
  return (
    <div className="relative flex-1 max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient  relative flex min-h-[56px] grow rounded-xl items-center gap-1 px-4">
        <Image
          src={"/assets/icons/search.svg"}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="search"
          placeholder="Search Globally"
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        />
      </div>
    </div>
  );
}

export default GlobalSearch;
