"use client";
import React, { useEffect, useState } from "react";
import PostForm from "../_components/PostForm";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Post } from "../../../_types/post";
import { Category } from "../../../_types/Category";

export default function page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    "https://placehold.jp/800x400.jpg"
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const { id } = useParams();
  const [isloading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          thumbnailUrl,
          categories,
        }),
      });
    } finally {
      setIsLoading(false);
    }

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
      const { post }: { post: Post } = await res.json();
      console.log("post", post);
      setTitle(post.title);
      setContent(post.content);
      setThumbnailUrl(post.thumbnailUrl);
      setCategories(post.postCategories.map((pc) => pc.category));
    };

    fetcher();
  }, [id]);
  console.log("categories", categories);
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
        isloading={isloading}
      />
    </>
  );
}
