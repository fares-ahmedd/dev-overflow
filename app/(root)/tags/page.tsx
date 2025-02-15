import { getAllTags } from "@/actions/tag.action";
import MyLink from "@/components/MyLink";
import NoResult from "@/components/NoResult";
import FilterSearch from "@/components/search/FilterSearch";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { TagFilters } from "@/lib/constants";

async function TagsPage() {
  const tags = await getAllTags({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex   justify-between items-center gap-5 max-md:flex-col">
        <LocalSearch
          route={"/tags"}
          imgSrc="/assets/icons/search.svg"
          placeholder="Search For Tags"
          className="w-full"
        />
        <FilterSearch filters={TagFilters} />
      </div>

      {tags.length > 0 ? (
        <section className="mt-12 grid gap-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {tags.map((tag) => (
            <div
              key={tag._id}
              className="shadow-light100_darknone background-light900_dark200 light-border flex w-full flex-col rounded-2xl border justify-center items-center gap-4 p-4"
            >
              <Button asChild className="uppercase">
                <MyLink href={`/tags/${tag._id}`}>{tag.name}</MyLink>
              </Button>

              <p className="small-medium text-dark500_light500 space-x-2">
                <span className="text-primary-500">
                  {tag.questions.length}+
                </span>
                <strong>Questions</strong>
              </p>
            </div>
          ))}
        </section>
      ) : (
        <NoResult
          title={"No Tags Found"}
          description="It looks like there are no tags found."
          link="/ask-question"
          linkTitle="Ask a question"
        />
      )}
    </>
  );
}

export default TagsPage;
