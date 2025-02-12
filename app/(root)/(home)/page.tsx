import { getQuestions } from "@/actions/question.action";
import QuestionCard from "@/components/cards/QuestionCard";
import MyLink from "@/components/MyLink";
import NoResult from "@/components/NoResult";
import FilterSearch from "@/components/search/FilterSearch";
import HomeFilterButtons from "@/components/search/HomeFilterButtons";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/lib/constants";

async function HomagPage() {
  const result = await getQuestions({});
  const questions = result.questions;
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
          route={"/"}
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
            <QuestionCard key={question._id} question={question} />
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
    </>
  );
}

export default HomagPage;
