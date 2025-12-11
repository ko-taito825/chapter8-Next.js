"use client";

import { useFetch } from "@/app/_hooks/useFetch";
import { Category } from "@/app/_types/Category";
import Link from "next/link";

type CategoriesResponse = {
  categories: Category[];
};
export default function Page() {
  const { data, error, isLoading } = useFetch<CategoriesResponse>(
    "/api/admin/categories",
    "categories"
  );

  if (error) return <div>カテゴリーの取得に失敗しました</div>;
  if (isLoading || !data) return <div>読み込み中...</div>;

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
        {data.categories.map((category) => {
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
