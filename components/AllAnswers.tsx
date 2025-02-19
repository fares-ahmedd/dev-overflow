import { AnswerFilters } from "@/lib/constants";
import FilterSearch from "./search/FilterSearch";
import { getAnswers } from "@/actions/answer.action";
import MyLink from "./MyLink";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";

type Props = {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: number;
};

async function AllAnswers({
  questionId,
  totalAnswers,
  userId,
  page,
  filter,
}: Props) {
  const answers = await getAnswers({ questionId });
  return (
    <div className="mt-11">
      <div className="flex-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} Answer{totalAnswers > 1 && "s"}
        </h3>

        <FilterSearch filters={AnswerFilters} className="w-fit px-6 z-50" />
      </div>

      <div>
        {answers.map((answer) => (
          <article key={answer._id} className="pb-2 pt-8">
            <div className="mb-2 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <MyLink
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  width={18}
                  height={18}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </p>
                  <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                    • answered {getTimestamp(answer.createdAt)}
                  </p>
                </div>
              </MyLink>
              <div className="flex justify-end">
                {/* <Votes
                  type="Answer"
                  itemId={JSON.stringify(answer._id)}
                  userId={JSON.stringify(userId)}
                  disableVoting={answer.author.clerkId === clerkId}
                  upvotes={answer.upvotes.length}
                  hasAlreadyUpvoted={answer.upvotes.includes(userId)}
                  downvotes={answer.downvotes.length}
                  hasAlreadyDownvoted={answer.downvotes.includes(userId)}
                /> */}
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
}

export default AllAnswers;
