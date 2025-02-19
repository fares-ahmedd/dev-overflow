import { getAllUsers } from "@/actions/user.action";
import UserCard from "@/components/cards/UserCard";
import MyLink from "@/components/MyLink";
import FilterSearch from "@/components/search/FilterSearch";
import LocalSearch from "@/components/search/LocalSearch";
import { UserFilters } from "@/lib/constants";

async function CommunityPage() {
  const users = await getAllUsers({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Community</h1>

      <div className="mt-11 flex   justify-between items-center gap-5 max-md:flex-col">
        <LocalSearch
          route={"/community"}
          imgSrc="/assets/icons/search.svg"
          placeholder="Search For Users"
          className="w-full"
        />
        <FilterSearch filters={UserFilters} />
      </div>

      {users.length > 0 ? (
        <section className="mt-12 grid gap-3 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </section>
      ) : (
        <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center grid self-center my-3">
          No users yet
          <MyLink href={"/sign-up"} className="mt-1 font-bold text-accent-blue">
            Join to be the first
          </MyLink>
        </div>
      )}
    </>
  );
}

export default CommunityPage;
