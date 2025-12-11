"use client";
import { useFetch } from "@/app/_hooks/useFetch";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  createdAt: Date;
};
export default function page() {
  const {
    data: posts,
    error,
    isLoading,
  } = useFetch<Post[]>("/api/admin/posts", "posts");

  if (error) return <div>取得に失敗しました</div>;
  if (isLoading) return <div>読み込み中...</div>;
  if (!posts) return null;
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">記事一覧</h1>
        <button>
          <Link
            href="/admin/posts/new"
            className="block text-white bg-blue-500 p-1"
          >
            新規作成
          </Link>
        </button>
      </div>
      <div className="my-10">
        {posts?.map((post) => {
          return (
            <Link href={`/admin/posts/${post.id}`} key={post.id}>
              <div className="my-7  border-b border-gray-300 ">
                <div className="font-bold">{post.title}</div>
                <div className="">
                  {new Date(post.createdAt).toLocaleDateString("ja-jp")}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
