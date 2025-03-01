"use client";

import Image from "next/image";
import { useFormStatus } from "react-dom";
type Props = {
  hasUpvoted: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function UpvoteButton({ hasUpvoted, ...props }: Props) {
  const { pending } = useFormStatus();

  console.log(pending);

  return (
    <button
      aria-label={hasUpvoted ? "unvote" : "vote"}
      className="transition-transform duration-200 hover:translate-y-1 "
      disabled={pending}
      {...props}
    >
      <Image
        src={
          hasUpvoted ? "/assets/icons/upvoted.svg" : "/assets/icons/upvote.svg"
        }
        alt="vote"
        width={18}
        height={18}
      />
    </button>
  );
}

export default UpvoteButton;
