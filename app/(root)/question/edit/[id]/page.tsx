import { getQuestionById } from "@/actions/question.action";
import { getUserById } from "@/actions/user.action";
import QuestionForm from "@/components/forms/QuestionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};
async function page({ params }: Props) {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  const currentQuestion = await getQuestionById({ questionId: params.id });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit a question</h1>

      <div className="mt-9">
        <QuestionForm
          type={"edit"}
          mongoUserId={JSON.stringify(mongoUser?._id)}
          questionDetails={JSON.stringify(currentQuestion)}
        />
      </div>
    </>
  );
}

export default page;
