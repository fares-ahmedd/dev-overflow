import { getPopularTags } from "@/actions/tag.action";
import MyLink from "../MyLink";
import { Badge } from "../ui/badge";

async function PopularTags() {
  const popularTags = await getPopularTags();

  return (
    <section>
      <h3 className="h3-bold mt-3 mb-6 ">Popular Tags</h3>

      <nav>
        <ul className="space-y-3">
          {popularTags?.map((tag) => (
            <li key={tag._id}>
              <MyLink href={`/tags/${tag._id}`} className="flex-between gap-4">
                <Badge className="small-medium  background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
                  {tag.name}
                </Badge>
                <small>{tag.numberOfQuestions}</small>
              </MyLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default PopularTags;
