"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import { NAVBAR_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "../LogoutButton";

function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  if (!isMobile) return null;
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src={"/assets/icons/hamburger.svg"}
          alt="Menu"
          width={30}
          height={30}
          className="invert-colors"
        />
      </SheetTrigger>
      <SheetContent className="background-light900_dark200 border-none w-full flex flex-col gap-4 overflow-y-auto">
        <SheetClose className="flex items-center gap-1">
          <Image
            src={"/assets/images/site-logo.svg"}
            alt="logo"
            width={23}
            height={23}
            onClick={() => router.push("/")}
          />
          <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900">
            Dev <span className="text-primary-500">Overflow</span>
          </p>
        </SheetClose>

        <nav className="space-y-2">
          {NAVBAR_LINKS.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            return (
              <SheetClose asChild key={link.label}>
                <Button
                  onClick={() => router.push(link.route)}
                  className={cn(
                    "w-full flex items-center justify-start gap-5 text-dark300_light900",
                    isActive && "primary-gradient rounded-lg text-light900"
                  )}
                  variant={"ghost"}
                >
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={20}
                    height={20}
                    className={cn(!isActive && "invert-colors")}
                  />{" "}
                  <strong className={cn(isActive && "text-light-900")}>
                    {" "}
                    {link.label}
                  </strong>
                </Button>
              </SheetClose>
            );
          })}
        </nav>

        <SignedOut>
          <div className="space-y-2 flex-1 flex flex-col justify-end">
            <SheetClose asChild>
              <Button
                onClick={() => router.push("/sign-in")}
                className="w-full"
              >
                Login
              </Button>
            </SheetClose>{" "}
            <SheetClose asChild>
              <Button
                onClick={() => router.push("/sign-up")}
                className="w-full"
                variant={"secondary"}
              >
                Sign Up
              </Button>
            </SheetClose>
          </div>
        </SignedOut>

        <LogoutButton />
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
