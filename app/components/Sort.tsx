"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { sortTypes } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sort = () => {
  const router = useRouter();
  const path = usePathname();

  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`);
  };

  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={sortTypes[0].value} />
      </SelectTrigger>
      <SelectContent className="sort-select-content">
        {sortTypes.map((item) => (
          <SelectItem
            key={item.label}
            className="shad-select-item"
            value={item.value}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;
