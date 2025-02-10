"use client";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

function User() {
  const { isLoaded } = useUser();

  if (!isLoaded)
    return (
      <Loader2 className="animate-spin size-6 sm:size-10 text-[#ff7000]" />
    );
  return (
    <SignedIn>
      <UserButton
        afterSwitchSessionUrl="/"
        appearance={{
          elements: {
            avatarBox: "size-6 sm:size-10",
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
