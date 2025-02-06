import { UserButton } from "@clerk/nextjs";

function HomagPage() {
  return (
    <div>
      <UserButton afterSwitchSessionUrl="/" />
    </div>
  );
}

export default HomagPage;
