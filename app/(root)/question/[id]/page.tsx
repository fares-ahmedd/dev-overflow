import { getQuestionById } from "@/actions/question.action";
import MyLink from "@/components/MyLink";
import Image from "next/image";
import Metric from "@/components/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import ParseHTML from "@/components/ParseHTML";
import RenderTag from "@/components/RenderTag";
import AnswerForm from "@/components/forms/AnswerForm";
import { auth } from "@clerk/nextjs/server";
import { UserType } from "@/lib/types";
import { getUserById } from "@/actions/user.action";
import AllAnswers from "@/components/AllAnswers";
import Votes from "@/components/Votes";

async function QuestionDetailsPage({ params }: { params: { id: string } }) {
  const { userId: clerkId } = await auth();
  const { id } = params;

  const question = await getQuestionById({ questionId: id });

  let mongoUser: UserType | null = null;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:ga">
          <MyLink
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              alt={`Profile`}
              width={22}
              height={22}
              className="rounded-full"
            />

            <span className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </span>
          </MyLink>

          <Votes
            type="Question"
            itemId={JSON.stringify(question._id)}
            userId={JSON.stringify(mongoUser?._id)}
            upvotes={question.upvotes.length}
            downvotes={question.downvotes.length}
            hasUpVoted={question.upvotes.includes(mongoUser?._id ?? "")}
            hasDownVoted={question.downvotes.includes(mongoUser?._id ?? "")}
            hasSaved={mongoUser?.saved?.includes(question._id) ?? false}
          />
        </div>

        <h2 className="h2-semibold text-dark200_light800 mt-3.5 w-full text-left">
          {question.title}
        </h2>

        <div className="mb-8 mt-5 flex flex-wrap gap-4 w-full">
          <Metric
            imgUrl="/assets/icons/clock.svg"
            alt="Clock icon"
            value={` Asked . ${getTimestamp(question.createdAt)}`}
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="Message"
            value={formatAndDivideNumber(question.answers.length)}
            title="Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="Eye"
            value={formatAndDivideNumber(question.views)}
            title="Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>

      <ParseHTML data={question.content} />

      <div className="my-6 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={question._id}
        userId={mongoUser?._id ?? ""}
        totalAnswers={question.answers.length}
      />

      <AnswerForm
        questionId={JSON.stringify(question._id)}
        authorId={JSON.stringify(mongoUser?._id)}
      />
    </>
  );
}

export default QuestionDetailsPage;
