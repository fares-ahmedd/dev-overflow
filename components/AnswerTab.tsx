import { getUserAnswers } from "@/actions/user.action";
import AnswerCard from "./cards/AnswerCard";

type Props = {
  searchParams: any;
  userId: string;
  clerkId?: string;
};

async function AnswerTab({ searchParams, userId, clerkId }: Props) {
  const result = await getUserAnswers({
    userId,
    page: 1,
  });

  return (
    <>
      {result?.answers.map((answer) => (
        <AnswerCard
          key={answer._id}
          _id={answer._id}
          clerkId={clerkId}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}
    </>
  );
}

export default AnswerTab;
