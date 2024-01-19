"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ICategory } from "@/lib/database/models/category.model";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeUrlQuery } from "@/lib/utils";

interface FilterProps {
  categories: ICategory[];
}

const Filter = ({ categories }: FilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelectCategory = (value: string) => {
    let url = "";

    if (value) {
      url = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: value.toLowerCase(),
      });

      return router.replace(url, { scroll: false });
    } else {
      url = removeUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });

      return router.replace(url, { scroll: false });
    }
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>
        {categories.length > 1 ? (
          categories.map((category: ICategory) => (
            <SelectItem
              key={category._id}
              value={category.name}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem
            value="No Categories yet!"
            className="select-item p-regular-14"
          >
            No Categories yet!
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default Filter;
