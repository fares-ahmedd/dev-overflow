"use client";
import Image from "next/image";
import { Input } from "../ui/input";

type Props = {
  route?: string;
  iconPosition?: "left" | "right";
  imgSrc: string;
  placeholder: string;
  className?: string;
};

function LocalSearch({
  iconPosition = "left",
  imgSrc,
  placeholder,
  route,
  className = "",
}: Props) {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${className}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="Search Icon"
          width={24}
          height={24}
          className="cursor-pointer"
          role="button"
        />
      )}
      <Input
        placeholder={placeholder}
        type="search"
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="Search Icon"
          width={24}
          height={24}
          className="cursor-pointer"
          role="button"
        />
      )}
    </div>
  );
}

export default LocalSearch;
