import { getUserQuestions } from "@/actions/user.action";
import QuestionCard from "./cards/QuestionCard";

type Props = {
  searchParams: any;
  userId: string;
  clerkId?: string;
};

async function QuestionTab({ searchParams, userId, clerkId }: Props) {
  const result = await getUserQuestions({
    userId,
    page: 1,
  });

  return (
    <>
      <div className="space-y-3">
        {result?.questions.map((question) => (
          <QuestionCard
            key={question._id}
            question={question}
            clerkId={clerkId}
          />
        ))}
      </div>
    </>
  );
}

export default QuestionTab;
