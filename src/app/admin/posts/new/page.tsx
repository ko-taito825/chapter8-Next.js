"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PostForm from "../_components/PostForm";
import { Post } from "../../../_types/post";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { SubmitHandler, useForm } from "react-hook-form";

export default function page() {
  const router = useRouter();
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
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        } as Record<string, string>,

        body: JSON.stringify(data),
      });
      const { id } = await res.json();
    } finally {
      setIsSubmitting(false);
    }

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
        register={register}
        errors={errors}
        reset={reset}
        control={control}
        setValue={setValue}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
