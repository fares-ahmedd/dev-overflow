"use client";
import { downvoteAnswer, upvoteAnswer } from "@/actions/answer.action";
import { downvoteQuestion, upvoteQuestion } from "@/actions/question.action";
import { toggleSaveQuestion } from "@/actions/user.action";
import { formatAndDivideNumber } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import SaveButton from "./SaveButton";
import VoteButton from "./VoteButton";

type Props = {
  type: "Question" | "Answer";
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
};

function Votes({
  downvotes,
  hasDownVoted,
  hasSaved,
  hasUpVoted,
  itemId,
  type,
  upvotes,
  userId,
}: Props) {
  const pathname = usePathname();

  const handleVote = async (action: string) => {
    if (!userId) return;

    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasAlreadyUpvoted: hasUpVoted,
          hasAlreadyDownvoted: hasDownVoted,
          path: pathname,
        });
        toast.success("Question upvoted successfully");
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasAlreadyUpvoted: hasUpVoted,
          hasAlreadyDownvoted: hasDownVoted,
          path: pathname,
        });
        toast.success("Answer upvoted successfully");
      }

      // todo: show a toast message
    }

    if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasAlreadyUpvoted: hasUpVoted,
          hasAlreadyDownvoted: hasDownVoted,
          path: pathname,
        });
        toast.success("Question downvoted successfully");
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasAlreadyUpvoted: hasUpVoted,
          hasAlreadyDownvoted: hasDownVoted,
          path: pathname,
        });
        toast.success("Answer downvoted successfully");
      }
    }
  };

  const handleSave = async () => {
    const res = await toggleSaveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname,
    });

    if (res) {
      toast.success("Question saved successfully");
    } else {
      toast.success("Question unsaved successfully");
    }
  };
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <form
          className="flex-center gap-1.5"
          action={() => handleVote("upvote")}
        >
          <VoteButton type="upvote" hasVoted={hasUpVoted} />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1 ">
            <motion.p
              key={upvotes}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.3 }}
              className="subtle-medium text-dark400_light800 "
            >
              {formatAndDivideNumber(upvotes)}
            </motion.p>
          </div>
        </form>

        <form
          className="flex-center gap-1.5"
          action={() => handleVote("downvote")}
        >
          <VoteButton type="downvote" hasVoted={hasDownVoted} />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <motion.p
              key={downvotes}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.3 }}
              className="subtle-medium text-dark400_light800"
            >
              {formatAndDivideNumber(downvotes)}
            </motion.p>
          </div>
        </form>
      </div>

      {type === "Question" && (
        <form action={handleSave}>
          <SaveButton hasSaved={hasSaved} />
        </form>
      )}
    </div>
  );
}

export default Votes;
