"use client";
import React, { useEffect } from "react";
import PostForm from "../_components/PostForm";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { PostInput, Post } from "../../../_types/post";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFetch } from "@/app/_hooks/useFetch";

export default function page({}) {
  const router = useRouter();
  const { id } = useParams();
  const { token } = useSupabaseSession();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<PostInput>({
    defaultValues: {
      title: "",
      content: "",
      thumbnailImageKey: "",
      categories: [],
    },
  });

  const {
    data: post,
    error,
    isLoading,
  } = useFetch<Post>(id ? `/api/admin/posts/${id}` : null, "post");
  const onSubmit: SubmitHandler<PostInput> = async (data) => {
    const payload = {
      title: data.title,
      content: data.content,
      thumbnailImageKey: data.thumbnailImageKey,
      categories: data.categories.map((c) => ({ id: c.id })),
    };
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: token ?? "",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("失敗しました");

      alert("記事を更新しました");
      router.push(`/admin/posts`);
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました。");
    }
  };

  const handleDelete = async () => {
    //!confirm() => ユーザーがOK押したら削除処理、キャンセルしたら関数終了
    if (!confirm("カテゴリーを削除しますか？")) return; //早期リターンのガード句
    await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token ?? "",
      },
    });

    alert("カテゴリーを削除しました");
    router.push("/admin/posts");
  };

  useEffect(() => {
    if (!post) return;
    reset({
      title: post.title,
      content: post.content,
      thumbnailImageKey: post.thumbnailImageKey,
      categories: post.postCategories.map((pc) => pc.category),
    });
  }, [post, reset]);

  if (error) return <div>取得に失敗しました</div>;
  if (isLoading) return <div>読み込み中...</div>;
  if (!post) return null;
  return (
    <>
      <div>
        <h1>記事編集</h1>
      </div>

      <PostForm
        mode="edit"
        register={register}
        errors={errors}
        control={control}
        setValue={setValue}
        onSubmit={handleSubmit(onSubmit)}
        onDelete={handleDelete}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
