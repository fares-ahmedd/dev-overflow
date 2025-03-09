"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import LocalSearch from "./LocalSearch";
import { AnimatePresence, motion } from "framer-motion";
import { GlobalSearchFilters } from "@/lib/constants";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import MyLink from "../MyLink";
import Image from "next/image";
import { globalSearchResults } from "@/actions/general.action";
function GlobalSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const [result, setResult] = useState([]);
  const searchParam = useSearchParams();
  const globalSearch = searchParam.get("global");
  const isOpen = globalSearch ? true : false;
  const filterType = searchParam.get("type") || "";

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      setResult([]);
      try {
        const res = await globalSearchResults({
          query: globalSearch || "",
          type: filterType || "",
        });
        setResult(JSON.parse(res));
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    if (globalSearch) fetchResult();
  }, [globalSearch, filterType]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;

      case "answer":
        return `/question/${id}`;

      case "user":
        return `/profile/${id}`;

      case "tag":
        return `/tags/${id}`;

      default:
        return "/";
    }
  };

  return (
    <div className="relative flex-1 max-w-[600px] max-lg:hidden">
      <LocalSearch
        query={"global"}
        imgSrc="/assets/icons/search.svg"
        placeholder="Search In General"
        className="w-full"
        key={pathname}
      />

      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            variants={{
              visible: {
                opacity: 1,
                y: 0,
              },
              hidden: {
                opacity: 0,
                y: -20,
              },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute left-0 mt-2 max-h-[500px] overflow-y-auto w-full z-[999] bg-light-800 dark:bg-dark-40 p-5 rounded-lg  overflow-x-hidden"
          >
            <GlobalSearchButtons />
            <hr className="my-5 h-[2px] bg-light-700/50 dark:bg-dark-500/50" />

            <h3 className="h3-bold my-4 ">Top Match</h3>

            {isLoading ? (
              <div className="flex flex-center flex-col px-5 py-10">
                <Loader2 className="animate-spin text-primary-500 size-[40px]" />
              </div>
            ) : (
              <div className="flex flex-col gap-2 ">
                {result.length > 0 ? (
                  result.map((question: any, index) => (
                    <MyLink
                      href={renderLink(question.type, question.id)}
                      key={question.type + question.id + index}
                      className="flex gap-6 py-3 px-4 rounded-lg hover:bg-light-700/50 dark:hover:bg-dark-500/50 last:border-hidden"
                    >
                      <Image
                        src={"/assets/icons/tag.svg"}
                        alt="tags"
                        width={18}
                        height={18}
                        className="invert-colors object-contain"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="body-medium text-dark200_light800 line-clamp-1">
                          {question.title}
                        </p>
                        <p className="text-primary-500 text-sm uppercase">
                          {question.type}
                        </p>
                      </div>
                    </MyLink>
                  ))
                ) : (
                  <div className="space-y-3">
                    <p className="text-center ">No Result Found</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GlobalSearch;

function GlobalSearchButtons() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParam = useSearchParams();
  const initialFilter = searchParam.get("type") || "all";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value !== "all" && initialFilter !== value) {
      params.set("type", value);
    } else {
      params.delete("type");
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <motion.div
      variants={{
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
        hidden: {
          opacity: 0,
          transition: {
            staggerChildren: 0.1,
            staggerDirection: -1,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="flex items-center gap-3 flex-wrap w-full"
    >
      <strong>Type: </strong>
      {GlobalSearchFilters.map((filter) => (
        <Button
          key={filter.value}
          variant={initialFilter === filter.value ? "default" : "outline"}
          size={"sm"}
          className={"body-medium rounded-lg "}
          onClick={() => handleFilter(filter.value)}
          asChild
        >
          <motion.button
            variants={{
              visible: {
                opacity: 1,
                y: 0,
              },
              hidden: { opacity: 0, y: -20 },
            }}
          >
            {filter.name}
          </motion.button>
        </Button>
      ))}
    </motion.div>
  );
}
