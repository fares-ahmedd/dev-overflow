import Header from "@/components/header/Index";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/right-sidebar/Index";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="background-light850_dark100 relative">
      <Header />
      <div className="flex 2xl:container ">
        <LeftSidebar />
        <section className="flex h-screen overflow-y-auto flex-1 flex-col pb-6 pt-28 max-md:pb-14 px-4 md:px-8 custom-scrollbar ">
          <div className="mx-auto w-full max-w-5xl my-2">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
}

export default layout;
