"use client";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  createdAt: Date;
};
export default function page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useSupabaseSession();

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      const res = await fetch("/api/admin/posts", {
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      });
      const { posts } = await res.json();
      setPosts(posts);
    };
    fetcher();
  });

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
        {posts.map((post) => {
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
