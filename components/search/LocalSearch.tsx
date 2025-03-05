"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

type Props = {
  query: string;
  iconPosition?: "left" | "right";
  imgSrc: string;
  placeholder: string;
  className?: string;
};

function LocalSearch({
  iconPosition = "left",
  imgSrc,
  placeholder,
  query,
  className = "",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const initialSearch = searchParams.get(query) || "";

  const handleSearch = useDebounce((term: string) => {
    const params = new URLSearchParams(window.location.search);

    if (term) {
      params.set(query, term);
    } else {
      params.delete(query);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${className}`}
    >
      {iconPosition === "left" && (
        <Image src={imgSrc} alt="Search Icon" width={24} height={24} />
      )}
      <Input
        placeholder={placeholder}
        type="search"
        defaultValue={initialSearch}
        onChange={(e) => handleSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image src={imgSrc} alt="Search Icon" width={24} height={24} />
      )}
    </div>
  );
}

export default LocalSearch;
