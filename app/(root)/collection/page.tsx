import { getSavedQuestions } from "@/actions/user.action";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/NoResult";
import Pagination from "@/components/Pagination";
import FilterSearch from "@/components/search/FilterSearch";
import LocalSearch from "@/components/search/LocalSearch";
import { QuestionFilters } from "@/lib/constants";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
type Props = { searchParams: { [key: string]: string | undefined } };

async function CollectionPage({ searchParams }: Props) {
  const searchQuery = searchParams.q;
  const filter = searchParams.filter;
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const { questions, meta } = await getSavedQuestions({
    clerkId: userId,
    searchQuery,
    filter,
    page,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex flex-col md:flex-row gap-2 justify-between items-center">
        <LocalSearch
          query="q"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search For Questions"
          className="w-full"
        />
        <FilterSearch filters={QuestionFilters} />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              clerkId={userId}
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

      <Pagination isNext={meta.isNext} totalPages={meta.totalPages} />
    </>
  );
}

export default CollectionPage;
