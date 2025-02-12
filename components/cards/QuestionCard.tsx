import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Metric from "../Metric";
import MyLink from "../MyLink";
import RenderTag from "../RenderTag";
import { IQuestion } from "@/db/question.model";
import { ITag } from "@/db/tag.model";
import { IUser } from "@/db/user.model";

interface Props {
  _id: IQuestion["_id"];
  title: IQuestion["title"];
  tags: ITag[];
  author: IUser;
  upvotes: IUser[];
  downvotes: IUser[];
  views: IQuestion["views"];
  answers: 0;
  createdAt: IQuestion["createdAt"];
  clerkId?: string | null;
}

const QuestionCard = ({ question }: { question: Props }) => {
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

        {/* <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn> */}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag
            key={tag._id as string}
            _id={tag._id as string}
            name={tag.name}
          />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div className="flex-start flex-wrap gap-3">
          <Metric
            imgUrl={"/assets/icons/avatar.svg"}
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
            value={formatAndDivideNumber(answers)}
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
