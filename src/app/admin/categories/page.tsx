"use client";

import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import Link from "next/link";
import useSWR from "swr";

type Category = {
  id: number;
  name: string;
};
export default function Page() {
  const { token } = useSupabaseSession();

  const fetcher = async ([url, token]: [string, string]) => {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (!res.ok) {
      throw new Error("カテゴリー取得に失敗しました");
    }
    const { categories } = await res.json();
    return categories as Category[];
  };
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR(token ? ["/api/admin/categories", token] : null, fetcher);
  if (error) return <div>カテゴリーの取得に失敗しました</div>;
  if (isLoading || !categories) return <div>読み込み中...</div>;

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
