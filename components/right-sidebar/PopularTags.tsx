import MyLink from "../MyLink";
import { Badge } from "../ui/badge";

function PopularTags() {
  return (
    <section>
      <h3 className="h3-bold mt-3 mb-6 ">Popular Tags</h3>

      <nav>
        <ul className="space-y-3">
          <li>
            <MyLink href={"/"} className="flex-between gap-4">
              <Badge className="small-medium  background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
                Tag
              </Badge>
              <small>5</small>
            </MyLink>
          </li>{" "}
          <li>
            <MyLink href={"/"} className="flex-between gap-4">
              <Badge className="small-medium  background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
                Tag
              </Badge>
              <small>5</small>
            </MyLink>
          </li>{" "}
          <li>
            <MyLink href={"/"} className="flex-between gap-4">
              <Badge className="small-medium  background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
                Tag
              </Badge>
              <small>5</small>
            </MyLink>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default PopularTags;
