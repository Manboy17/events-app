"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (type: "prev" | "next") => {
    const pageValue = type === "prev" ? page - 1 : page + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageValue.toString(),
    });

    router.replace(newUrl, { scroll: false });
  };

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
        disabled={page === 1}
      >
        <p
          className="body-medium text-dark200_light800"
          onClick={() => handleClick("prev")}
        >
          Prev
        </p>
      </Button>

      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-white">{page}</p>
      </div>

      <Button
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
        disabled={page >= totalPages}
      >
        <p
          className="body-medium text-dark200_light800"
          onClick={() => handleClick("next")}
        >
          Next
        </p>
      </Button>
    </div>
  );
};

export default Pagination;
