"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

type Props = {
  query: string;
  imgSrc: string;
  placeholder: string;
  className?: string;
};

function LocalSearchContent({
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
      <Image src={imgSrc} alt="Search Icon" width={24} height={24} />

      <Input
        placeholder={placeholder}
        type="search"
        defaultValue={initialSearch}
        onChange={(e) => handleSearch(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />
    </div>
  );
}

function LocalSearch(props: any) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin size-6" />
        </div>
      }
    >
      <LocalSearchContent {...props} />
    </Suspense>
  );
}

export default LocalSearch;
