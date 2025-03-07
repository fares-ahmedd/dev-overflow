import { getQuestions } from "@/actions/question.action";
import QuestionCard from "@/components/cards/QuestionCard";
import MyLink from "@/components/MyLink";
import NoResult from "@/components/NoResult";
import Pagination from "@/components/Pagination";
import FilterSearch from "@/components/search/FilterSearch";
import HomeFilterButtons from "@/components/search/HomeFilterButtons";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";

type Props = { searchParams: { [key: string]: string | undefined } };
async function HomagPage({ searchParams }: Props) {
  const searchQuery = searchParams.q;
  const filter = searchParams.filter;
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const { userId: clerkId } = await auth();
  const { questions, meta } = await getQuestions({ searchQuery, filter, page });

  return (
    <>
      <div className="flex-between flex-wrap-reverse gap-2 ">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button asChild>
          <MyLink
            href={"/ask-question"}
            className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 max-sm:w-full"
          >
            Ask a question
          </MyLink>
        </Button>
      </div>

      <div className="mt-11 flex flex-col  justify-between items-center gap-5 max-md:flex-row  max-sm:flex-col">
        <LocalSearch
          query={"q"}
          imgSrc="/assets/icons/search.svg"
          placeholder="Search For Questions"
          className="w-full"
        />
        <FilterSearch filters={HomePageFilters} className="md:hidden" />
        <HomeFilterButtons />
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
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. our query could be the next big thing others learn from. Get
          involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <Pagination isNext={meta.isNext} totalPages={meta.totalPages} />
    </>
  );
}

export default HomagPage;
