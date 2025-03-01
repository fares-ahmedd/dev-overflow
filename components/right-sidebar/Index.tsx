import PopularTags from "./PopularTags";
import TopQuestions from "./TopQuestions";

function RightSidebar() {
  return (
    <aside className="hidden lg:flex h-screen sticky top-0 flex-col pb-6 pt-28 max-md:pb-14 px-4 md:px-8  w-[300px] custom-scrollbar  background-light900_dark200 overflow-y-auto space-y-8">
      <TopQuestions />
      <PopularTags />
    </aside>
  );
}

export default RightSidebar;
