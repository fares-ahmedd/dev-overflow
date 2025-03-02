"use client";

import { SignedIn, useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import useConfirm from "@/hooks/useConfirm";

function LogoutButton({ className }: { className?: string }) {
  const { signOut } = useAuth();
  const [ConfirmDialog, confirm] = useConfirm(
    "Logout",
    "Are you sure you want to logout?"
  );
  const handleLogout = async () => {
    const ok = await confirm();

    if (ok) {
      signOut();
    }
  };
  return (
    <SignedIn>
      <ConfirmDialog />
      <div className="flex-1 flex flex-col justify-end ">
        <Button onClick={handleLogout} variant={"outline"}>
          <LogOut className="!size-5" />{" "}
          <span className={className}>Logout</span>
        </Button>{" "}
      </div>
    </SignedIn>
  );
}

export default LogoutButton;
