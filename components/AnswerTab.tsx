import { getUserAnswers } from "@/actions/user.action";
import AnswerCard from "./cards/AnswerCard";
import { Info } from "lucide-react";
import Pagination from "./Pagination";

type Props = {
  searchParams: { [key: string]: string | undefined };
  userId: string;
  clerkId?: string;
};

async function AnswerTab({ searchParams, userId, clerkId }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const result = await getUserAnswers({
    userId,
    page,
  });

  return (
    <>
      {result?.answers && result.answers.length > 1 ? (
        result.answers.map((answer) => (
          <AnswerCard
            key={answer._id}
            _id={answer._id}
            clerkId={clerkId}
            question={answer.question}
            author={answer.author}
            upvotes={answer.upvotes.length}
            createdAt={answer.createdAt}
          />
        ))
      ) : (
        <p className="my-4 p-3 border border-blue-500  text-blue-700 rounded-lg flex items-center gap-2">
          <Info className="w-5 h-5" />
          The user has no answers.
        </p>
      )}

      <Pagination
        isNext={result?.meta.isNext || false}
        totalPages={result?.meta.totalPages || 1}
      />
    </>
  );
}

export default AnswerTab;
