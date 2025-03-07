import { getUserQuestions } from "@/actions/user.action";
import QuestionCard from "./cards/QuestionCard";
import { Info } from "lucide-react";
import Pagination from "./Pagination";

type Props = {
  searchParams: { [key: string]: string | undefined };
  userId: string;
  clerkId?: string;
};

async function QuestionTab({ searchParams, userId, clerkId }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const result = await getUserQuestions({
    userId,
    page,
  });

  return (
    <>
      <div className="space-y-4">
        {result?.questions && result.questions.length > 0 ? (
          result.questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              clerkId={clerkId}
            />
          ))
        ) : (
          <p className="my-4 p-3 border border-blue-500 text-blue-700 rounded-lg flex items-center gap-2">
            <Info className="w-5 h-5" />
            The user has no answers.
          </p>
        )}
      </div>

      <Pagination
        isNext={result?.meta.isNext || false}
        totalPages={result?.meta.totalPages || 1}
      />
    </>
  );
}

export default QuestionTab;
