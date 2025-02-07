import MyLink from "@/components/shared/MyLink";

function HomagPage() {
  return (
    <div className="space-x-6">
      HomePage
      <MyLink href={"/"} className="text-red-600">
        test
      </MyLink>
    </div>
  );
}

export default HomagPage;
