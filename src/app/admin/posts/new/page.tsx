"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PostForm from "../_components/PostForm";
import { Category } from "@prisma/client";

export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    "https://placehold.jp/800x400.jpg"
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title, content, thumbnailUrl, categories }),
    });
    const { id } = await res.json();
    alert("記事を作成しました");
    router.push(`/admin/posts`);
  };
  return (
    <div>
      <div>
        <h1 className="font-bold text-2xl">記事作成</h1>
      </div>
      <PostForm
        mode="new"
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
