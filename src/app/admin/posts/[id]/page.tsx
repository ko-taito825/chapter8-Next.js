"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import PostForm from "../_components/PostForm";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Post } from "../../../_types/post";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";

export default function page({}) {
  // const {data: post} = useSWR(id ? `/api/admin/posts/${id}`: null, fetcher)
  const router = useRouter();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useSupabaseSession();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<Post>({
    defaultValues: {
      title: "",
      content: "",
      thumbnailImageKey: "",
      postCategories: [],
    },
  });

  const onSubmit: SubmitHandler<Post> = async (data) => {
    setIsSubmitting(true);
    const payload = {
      title: data.title,
      content: data.content,
      thumbnailImageKey: data.thumbnailImageKey,
      categories: data.postCategories.map((c) => ({ id: c.id })),
    };
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        } as Record<string, string>, //headersをキャストして逃げる
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("失敗しました");

      alert("記事を更新しました");
      router.push(`/admin/posts`);
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    //!confirm() => ユーザーがOK押したら削除処理、キャンセルしたら関数終了
    if (!confirm("カテゴリーを削除しますか？")) return; //早期リターンのガード句
    await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      } as Record<string, string>, //headersをキャストして逃げる
    });

    alert("カテゴリーを削除しました");
    router.push("/admin/posts");
  };

  // useEffect(() => {
  //   if (!token) return;
  //   const fetcher = async () => {
  //     try {
  //       const res = await fetch(`/api/admin/posts/${id}`, {
  //         headers: {
  //           "Content-type": "application/json",
  //           Authorization: token,
  //         },
  //       });
  //       if (!res.ok) throw new Error("通信エラー発生しました");
  //       const { post }: { post: Post } = await res.json();
  //       console.log("postCategories", post.postCategories);
  //       reset({
  //         title: post.title,
  //         content: post.content,
  //         thumbnailImageKey: post.thumbnailImageKey,
  //         postCategories: post.postCategories.map(
  //           (pc) => pc.category
  //         ),
  //       });
  //     } catch (errors) {
  //       console.error(errors);
  //       alert("データの取得に失敗しました");
  //     }
  //   };

  //   fetcher();
  // }, [id, token, reset]);

  const fetcher = async ([url, token]: [string, string]) => {
    const res = await fetch(url, {
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    });
    if (!res.ok) {
      throw new Error("通信エラーが発生しました");
    }
    const { post }: { post: Post } = await res.json();
    return post;
  };

  const {
    data: post,
    error,
    isLoading,
  } = useSWR(token && id ? [`/api/admin/posts/${id}`, token] : null, fetcher);

  useEffect(() => {
    if (!post) return;
    reset({
      title: post.title,
      content: post.content,
      thumbnailImageKey: post.thumbnailImageKey,
      postCategories: post.postCategories.map((pc) => pc.category),
    });
  }, [post, reset]);

  if (isLoading) {
    return <p>読み込み中...</p>;
  }
  if (error) {
    return <p>データの取得に失敗しました</p>;
  }
  return (
    <>
      <div>
        <h1>記事編集</h1>
      </div>

      <PostForm
        mode="edit"
        register={register}
        errors={errors}
        reset={reset}
        control={control}
        setValue={setValue}
        onSubmit={handleSubmit(onSubmit)}
        onDelete={handleDelete}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
