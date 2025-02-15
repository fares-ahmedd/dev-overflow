"use client";

import { SignedIn, useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

function LogoutButton({ className }: { className?: string }) {
  const { signOut } = useAuth();
  return (
    <SignedIn>
      <div className="flex-1 flex flex-col justify-end ">
        <Button onClick={() => signOut()} variant={"outline"}>
          <LogOut className="!size-5" />{" "}
          <span className={className}>Logout</span>
        </Button>{" "}
      </div>
    </SignedIn>
  );
}

export default LogoutButton;
