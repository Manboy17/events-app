"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeUrlQuery } from "@/lib/utils";

const Search = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get("q");
  const router = useRouter();
  const [query, setQuery] = useState(searchQuery || "");

  useEffect(() => {
    const debouncedFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: query.toLowerCase(),
        });

        router.replace(newUrl, { scroll: false });
      } else {
        if (searchQuery) {
          const newUrl = removeUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });

          router.replace(newUrl, { scroll: false });
        }
      }

      return () => clearTimeout(debouncedFn);
    }, 300);
  }, [router, query, searchParams, searchQuery]);

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />
      <Input
        type="text"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-grey-500 focus:border-0 "
      />
    </div>
  );
};

export default Search;
