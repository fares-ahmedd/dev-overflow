"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useFormStatus } from "react-dom";
type Props = {
  type: "downvote" | "upvote";
  hasVoted: boolean;
  onClick?: VoidFunction;
};

function VoteButton({ hasVoted, type, onClick }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      aria-label={hasVoted ? "unvote" : "vote"}
      className={cn(
        "transition-transform duration-200  active:scale-90 ",

        type === "downvote" ? "hover:translate-y-1" : "hover:-translate-y-1"
      )}
      disabled={pending}
      onClick={onClick}
    >
      <Image
        src={
          hasVoted ? `/assets/icons/${type}d.svg` : `/assets/icons/${type}.svg`
        }
        alt="vote"
        width={18}
        height={18}
      />
    </button>
  );
}

export default VoteButton;
