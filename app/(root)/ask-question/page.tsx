import { getUserById } from "@/actions/user.action";
import QuestionForm from "@/components/forms/QuestionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Ask Question",
};

async function AskQuestionPage() {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <QuestionForm
          mongoUserId={JSON.stringify(mongoUser?._id)}
          type="create"
        />
      </div>
    </div>
  );
}

export default AskQuestionPage;
