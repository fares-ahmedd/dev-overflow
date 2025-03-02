import { QuestionWithAnswersAndTags } from "@/lib/types";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Metric from "../Metric";
import MyLink from "../MyLink";
import RenderTag from "../RenderTag";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../EditDeleteAction";

interface Props {
  question: QuestionWithAnswersAndTags;
  clerkId?: string | undefined | null;
}

const QuestionCard = ({ question, clerkId }: Props) => {
  const {
    _id,
    title,
    tags,
    author,
    upvotes,
    downvotes,
    views,
    answers,
    createdAt,
  } = question;

  const showActionButtons = clerkId && author.clerkId === clerkId;
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <MyLink
            href={`/question/${_id}`}
            className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1"
          >
            {title}
          </MyLink>
        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div className="flex-start flex-wrap gap-3">
          <Metric
            imgUrl={author.picture}
            alt="User"
            value={author.name}
            title={` • asked ${getTimestamp(createdAt)}`}
            href={`/profile/${author._id}`}
            isAuthor
            textStyles="body-medium text-dark400_light700"
          />
        </div>
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/upvote.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes.length)}
            title="Upvotes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/downvote.svg"
            alt="Downvotes"
            value={formatAndDivideNumber(downvotes.length)}
            title="Downvotes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="Message"
            value={formatAndDivideNumber(answers.length)}
            title="Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="Eye"
            value={formatAndDivideNumber(views)}
            title="Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
