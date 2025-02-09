import { SignedIn, UserButton } from "@clerk/nextjs";

function User() {
  return (
    <SignedIn>
      <UserButton
        afterSwitchSessionUrl="/"
        appearance={{
          elements: {
            avatarBox: "size-6 md:size-10",
          },
          variables: {
            colorPrimary: "#ff7000",
          },
        }}
      />
    </SignedIn>
  );
}

export default User;
