import QuestionCard from "@/components/cards/QuestionCard";
import MyLink from "@/components/MyLink";
import NoResult from "@/components/NoResult";
import FilterSearch from "@/components/search/FilterSearch";
import HomeFilterButtons from "@/components/search/HomeFilterButtons";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/lib/constants";

const mockQuestions = [
  {
    _id: 1,
    title: "What is the best way to learn React?",
    tags: [
      { id: 1, name: "React" },
      { id: 2, name: "JavaScript" },
      { id: 3, name: "Frontend" },
    ],
    author: {
      _id: "author1",
      name: "John Doe",
      picture: "https://example.com/john-doe.jpg",
    },
    upvotes: 100,
    downvotes: 64468,
    views: 1000000,
    answers: [{}],
    createdAt: "2022-01-01",
  },
  {
    _id: 2,
    title: "How To center a Div",
    tags: [
      { id: 1, name: "Html" },
      { id: 2, name: "Css" },
      { id: 3, name: "Frontend" },
    ],
    author: {
      _id: "author2",
      name: "Khaled",
      picture: "https://example.com/khaled.jpg",
    },
    upvotes: 15,
    downvotes: 64468,
    views: 150,
    answers: [{}],
    createdAt: "2020-01-01",
  },
  {
    _id: 3, // changed from 1 to 3 to make it unique
    title: "What's SSR in Next.js?",
    tags: [
      { id: 1, name: "Next" },
      { id: 2, name: "SSR" },
      { id: 3, name: "CSR" },
    ],
    author: {
      _id: "author3",
      name: "Reda",
      picture: "https://example.com/reda.jpg",
    },
    upvotes: 6,
    views: 80,
    downvotes: 64468,
    answers: [{}],
    createdAt: "2023-01-01",
  },
];
function HomagPage() {
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
        {mockQuestions.length > 0 ? (
          mockQuestions.map((question) => (
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
