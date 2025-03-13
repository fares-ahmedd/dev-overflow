import { getAllUsers } from "@/actions/user.action";
import UserCard from "@/components/cards/UserCard";
import MyLink from "@/components/MyLink";
import Pagination from "@/components/Pagination";
import FilterSearch from "@/components/search/FilterSearch";
import LocalSearch from "@/components/search/LocalSearch";
import { UserFilters } from "@/lib/constants";
type Props = { searchParams: { [key: string]: string | undefined } };

export const metadata = {
  title: "Community",
};

async function CommunityPage({ searchParams }: Props) {
  const searchQuery = searchParams.q;
  const filter = searchParams.filter;
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { users, meta } = await getAllUsers({ searchQuery, filter, page });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 ">Community</h1>

      <div className="mt-11 flex   justify-between items-center gap-5 max-md:flex-col">
        <LocalSearch
          query={"q"}
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
        <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center grid self-center my-10">
          No users yet
          <MyLink
            href={"/sign-up"}
            className="mt-1 font-bold text-accent-blue hover:underline"
          >
            Join to be the first
          </MyLink>
        </div>
      )}
      <Pagination isNext={meta.isNext} totalPages={meta.totalPages} />
    </>
  );
}

export default CommunityPage;
