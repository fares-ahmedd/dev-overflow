import { getQuestionsByTagId } from "@/actions/tag.action";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/NoResult";
import LocalSearch from "@/components/search/LocalSearch";
import { auth } from "@clerk/nextjs/server";

export type Props = {
  params: {
    id: string;
  };
  searchParams: null;
};

async function page({ params, searchParams }: Props) {
  const { userId: clerkId } = await auth();
  const { name, questions } = await getQuestionsByTagId({
    tagId: params.id,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{name}</h1>

      <div className="mt-11 ">
        <LocalSearch
          route={"/"}
          imgSrc="/assets/icons/search.svg"
          placeholder="Search Tag Questions"
          className="w-full"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              clerkId={clerkId}
            />
          ))
        ) : (
          <NoResult
            title="There's no saved question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}

export default page;
