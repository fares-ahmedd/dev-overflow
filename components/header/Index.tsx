import Image from "next/image";
import Link from "next/link";
import User from "./User";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";

function Header() {
  return (
    <header className="fixed z-50 w-full gap-5 py-6 shadow-light-300 dark:shadow-none sm:px-6 background-light900_dark200">
      <nav className="flex-between container mx-auto gap-2">
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={"/assets/images/site-logo.svg"}
            alt="logo"
            width={23}
            height={23}
          />
          <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
            Dev <span className="text-primary-500">Overflow</span>
          </p>
        </Link>

        <GlobalSearch />

        <div className="flex-between gap-5">
          <Theme />
          <User />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}

export default Header;
