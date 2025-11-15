"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
};
export default function page() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/admin/posts");
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
              <div className="my-7 font-bold border-b border-gray-300 ">
                <div>{post.title}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
