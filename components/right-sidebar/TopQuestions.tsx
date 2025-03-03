import Image from "next/image";
import MyLink from "../MyLink";
import { getHotQuestions } from "@/actions/question.action";

async function TopQuestions() {
  const hotQuestions = await getHotQuestions();
  return (
    <section>
      <h3 className="h3-bold mb-6 ">Top Questions</h3>

      <nav>
        <ul className="space-y-3">
          {hotQuestions?.map((question) => (
            <li key={question._id}>
              <MyLink
                href={`/question/${question._id}`}
                className="flex items-center gap-1"
              >
                <small className="break-words hyphens-auto text-dark500_light700 body-medium line-clamp-3">
                  {question.title}
                </small>
                <Image
                  src={"/assets/icons/chevron-right.svg"}
                  alt="Chevron Right"
                  className="invert-colors"
                  width={20}
                  height={20}
                />
              </MyLink>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default TopQuestions;
