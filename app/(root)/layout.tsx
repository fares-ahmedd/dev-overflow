import Header from "@/components/header/Header";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="background-light850_dark100 relative">
      <Header />
      <div className="flex">
        Leftsidebar
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        Rightsidebar
      </div>
      Toaster
    </main>
  );
}

export default layout;
