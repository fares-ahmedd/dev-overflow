"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { NAVBAR_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SignedOut, useUser } from "@clerk/nextjs";
import { User2, UserPlus2 } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import MyLink from "./MyLink";
import { Button } from "./ui/button";

function LeftSidebar() {
  const pathname = usePathname();
  const isMobile = useMediaQuery();
  const { user } = useUser();

  if (isMobile) return null;
  return (
    <aside className="flex h-screen  sticky top-0  flex-col pb-6 pt-28 max-md:pb-14 px-4 md:px-8  background-light900_dark200 overflow-y-auto">
      <nav>
        <ul className="space-y-2 flex flex-col ">
          {NAVBAR_LINKS.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            return (
              <Button
                key={link.label}
                variant={"ghost"}
                asChild
                className="flex justify-start gap-1"
              >
                <MyLink
                  className={cn(
                    "flex items-center justify-start gap-5 ",
                    isActive && "primary-gradient rounded-lg !text-light900"
                  )}
                  href={
                    link.route === "/profile"
                      ? user?.id
                        ? `${link.route}/${user.id}`
                        : "/sign-in"
                      : link.route
                  }
                >
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={20}
                    height={20}
                    className={cn(!isActive && "invert-colors")}
                  />{" "}
                  <strong
                    className={cn(
                      "max-md:hidden",
                      isActive && "text-light-900"
                    )}
                  >
                    {link.label}
                  </strong>
                </MyLink>
              </Button>
            );
          })}
        </ul>
      </nav>

      <SignedOut>
        <div className="space-y-2 flex-1 flex flex-col justify-end">
          <Button asChild>
            <MyLink href={"/sign-in"}>
              <span className="max-md:hidden">Login</span>{" "}
              <User2 className="!size-5 dark:fill-black  md:hidden" />
            </MyLink>
          </Button>{" "}
          <Button asChild variant={"secondary"}>
            <MyLink href={"/sign-up"}>
              <span className="max-md:hidden">Sign Up</span>{" "}
              <UserPlus2 className="!size-5 md:hidden" />
            </MyLink>
          </Button>
        </div>
      </SignedOut>

      <LogoutButton className="max-md:hidden" />
    </aside>
  );
}

export default LeftSidebar;
