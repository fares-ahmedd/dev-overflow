import { getTopInteractedTags } from "@/actions/tag.action";
import { UserType } from "@/lib/types";
import Image from "next/image";
import MyLink from "../MyLink";
import RenderTag from "../RenderTag";
import { Badge } from "../ui/badge";

type Props = {
  user: UserType;
};

async function UserCard({ user }: Props) {
  const interactedTags = await getTopInteractedTags({
    userId: user._id as string,
  });

  return (
    <div className="shadow-light100_darknone">
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8 h-full">
        <MyLink href={`/profile/${user.clerkId}`}>
          <Image
            src={user.picture}
            alt={user.name}
            width={100}
            height={100}
            className="rounded-full size-[6.25rem]"
          />
        </MyLink>

        <div className="mt-4 text-center">
          <h3
            className="h4-bold text-dark200_light900 line-clamp-1"
            title={user.name}
          >
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>

        <div className="mt-5 w-full">
          {interactedTags.length > 0 ? (
            <div className="grid grid-cols-1 gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag.id} _id={tag.id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge className="small-regular background-light800_dark300 text-dark200_light900 rounded-md border-none px-4 py-2">
              No tags yet
            </Badge>
          )}
        </div>
      </article>
    </div>
  );
}

export default UserCard;
