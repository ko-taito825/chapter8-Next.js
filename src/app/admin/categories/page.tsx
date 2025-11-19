"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};
export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/admin/categories");
      const { categories } = await res.json();
      console.log("categories", categories);
      setCategories(categories);
    };
    fetcher();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">カテゴリー一覧</h1>
        <button>
          <Link
            href="/admin/categories/new"
            className="block text-white bg-blue-500 p-1"
          >
            新規作成
          </Link>
        </button>
      </div>
      <div className="my-10">
        {categories.map((category) => {
          return (
            <Link href={`/admin/categories/${category.id}`} key={category.id}>
              <div className="my-7 font-bold border-b border-gray-300 ">
                <div>{category.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
