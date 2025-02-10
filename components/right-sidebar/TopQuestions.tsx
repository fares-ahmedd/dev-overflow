import Image from "next/image";
import MyLink from "../MyLink";

function TopQuestions() {
  return (
    <section>
      <h3 className="h3-bold mb-6 ">TopQuestions</h3>

      <nav>
        <ul className="space-y-3">
          <li>
            <MyLink href={"/"} className="flex items-center gap-1">
              <small className="break-words hyphens-auto text-dark500_light700 body-medium line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </small>
              <Image
                src={"/assets/icons/chevron-right.svg"}
                alt="Chevron Right"
                className="invert-colors"
                width={20}
                height={20}
              />
            </MyLink>
          </li>{" "}
          <li>
            <MyLink href={"/"} className="flex items-center gap-1">
              <small className="break-words hyphens-auto text-dark500_light700 body-medium line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </small>
              <Image
                src={"/assets/icons/chevron-right.svg"}
                alt="Chevron Right"
                width={20}
                height={20}
              />
            </MyLink>
          </li>{" "}
          <li>
            <MyLink href={"/"} className="flex items-center gap-1">
              <small className="break-words hyphens-auto text-dark500_light700 body-medium line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </small>
              <Image
                src={"/assets/icons/chevron-right.svg"}
                alt="Chevron Right"
                width={20}
                height={20}
              />
            </MyLink>
          </li>{" "}
          <li>
            <MyLink href={"/"} className="flex-between gap-1">
              <small className="break-words hyphens-auto text-dark500_light700 body-medium line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </small>
              <Image
                src={"/assets/icons/chevron-right.svg"}
                alt="Chevron Right"
                width={20}
                height={20}
              />
            </MyLink>
          </li>{" "}
          <li>
            <MyLink href={"/"} className="flex items-center gap-1">
              <small className="break-words hyphens-auto text-dark500_light700 body-medium line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </small>
              <Image
                src={"/assets/icons/chevron-right.svg"}
                alt="Chevron Right"
                width={20}
                height={20}
              />
            </MyLink>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default TopQuestions;
