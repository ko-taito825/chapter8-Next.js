"use client";
import React, { useEffect, useState } from "react";
import PostForm from "../_components/PostForm";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { useParams } from "next/navigation";

interface Post {
  post: {
    id: number;
    content: string;
    title: string;
    thumbnailUrl: string;
    postCategories: {
      id: number;
      postId: number;
      categoryId: number;
      createdAt: Date;
      updatedAt: Date;
      category: {
        id: number;
        name: string;
      };
    }[];
  };
}
export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    "https://placehold.jp/800x400.jpg"
  );
  const [categories, setCategories] = useState<number[]>([]);
  const router = useRouter();
  const { id } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        thumbnailUrl,
        categories: categories.map((category) => ({ id: category })),
      }),
    });
    alert("記事を更新しました");
    router.push(`/admin/posts`);
  };

  const handleDelete = async () => {
    //!confirm() => ユーザーがOK押したら削除処理、キャンセルしたら関数終了
    if (!confirm("カテゴリーを削除しますか？")) return; //早期リターンのガード句
    await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
    });

    alert("カテゴリーを削除しました");
    router.push("/admin/posts");
  };

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/admin/posts/${id}`);
      const { post }: Post = await res.json();
      console.log("post", post);
      setTitle(post.title);
      setContent(post.content);
      setThumbnailUrl(post.thumbnailUrl);
      setCategories(post.postCategories.map((category) => category.categoryId));
    };

    fetcher();
  }, [id]);

  return (
    <>
      <div>
        <h1>記事編集</h1>
      </div>
      <PostForm
        mode="edit"
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        thumbnailUrl={thumbnailUrl}
        setThumbnailUrl={setThumbnailUrl}
        categories={categories}
        setCategories={setCategories}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </>
  );
}
