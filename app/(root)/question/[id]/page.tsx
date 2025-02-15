import { getQuestionById } from "@/actions/question.action";
import MyLink from "@/components/MyLink";
import Image from "next/image";
import Metric from "@/components/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import ParseHTML from "@/components/ParseHTML";
import RenderTag from "@/components/RenderTag";
import AnswerForm from "@/components/forms/AnswerForm";

async function QuestionDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const question = await getQuestionById({ questionId: id });

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

          <div className="flex justify-end">VOTIING</div>
        </div>

        <h2 className="h2-semibold text-dark200_light800 mt-3.5 w-full text-left">
          {question.title}
        </h2>

        <div className="mb-8 mt-5 flex flex-wrap gap-4 w-full">
          <Metric
            imgUrl="/assets/icons/clock.svg"
            alt="Clock icon"
            value={` asked . ${getTimestamp(question.createdAt)}`}
            title="Asked"
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

      <AnswerForm />
    </>
  );
}

export default QuestionDetailsPage;
