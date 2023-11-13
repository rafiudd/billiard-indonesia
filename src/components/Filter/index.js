"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Filter({ data }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );


  return (
    <select
      id="countries"
      class="bg-violet-700
        border border-gray-300 
      text-gray-900 text-sm rounded-lg 
      focus:ring-blue-500 focus:border-blue-500 block 
        w-full p-2.5 dark:bg-violet-700 
      dark:border-gray-600 dark:placeholder-gray-400 
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={(e) => router.push(`${pathname}?${createQueryString('filter', e.target.value)}`)}
    >
      <option selected value="XT Billiard">XT Billiard</option>
      <option value="Jogja Billiard">Jogja Billiard</option>
    </select>
  );
}
