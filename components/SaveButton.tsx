"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useFormStatus } from "react-dom";

type Props = {
  hasSaved: boolean | undefined;
};

function SaveButton({ hasSaved }: Props) {
  const { pending } = useFormStatus();

  return (
    <motion.button
      aria-label={hasSaved ? "unsave" : "save"}
      disabled={pending}
      className="flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={
        hasSaved
          ? { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }
          : { rotate: 0, scale: 1 }
      }
      transition={{ duration: 0.4 }}
    >
      <Image
        src={
          hasSaved
            ? "/assets/icons/star-filled.svg"
            : "/assets/icons/star-red.svg"
        }
        alt="vote"
        width={18}
        height={18}
      />
    </motion.button>
  );
}

export default SaveButton;
