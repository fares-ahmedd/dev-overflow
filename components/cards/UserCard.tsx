import { IUser } from "@/db/user.model";
import MyLink from "../MyLink";
import Image from "next/image";
import { getTopInteractedTags } from "@/actions/tag.action";
import { Badge } from "../ui/badge";
import RenderTag from "../RenderTag";

type Props = {
  user: {
    _id: IUser["_id"];
    clerkId: IUser["clerkId"];
    picture: IUser["picture"];
    name: IUser["name"];
    username: IUser["username"];
  };
};

async function UserCard({ user }: Props) {
  const interactedTags = await getTopInteractedTags({
    userId: user._id as string,
  });

  return (
    <div className="shadow-light100_darknone">
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <MyLink href={`/profile/${user.username}`}>
          <Image
            src={user.picture}
            alt={user.name}
            width={100}
            height={100}
            className="rounded-full"
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

        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
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
