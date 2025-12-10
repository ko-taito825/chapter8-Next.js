"use client";
import { useRouter } from "next/navigation";
import PostForm from "../_components/PostForm";
import { PostInput } from "../../../_types/post";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { SubmitHandler, useForm } from "react-hook-form";

export default function page() {
  const router = useRouter();
  const { token } = useSupabaseSession();
  const {
    register,
    handleSubmit,
    control,
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
  const onSubmit: SubmitHandler<PostInput> = async (data) => {
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token ?? "",
        },

        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`作成失敗: ${res.status}`);
      }
      await res.json();
      alert("記事を作成しました");
      router.push(`/admin/posts`);
    } catch (e) {
      console.error(e);
      alert("記事の作成に失敗しました");
    }
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
        control={control}
        setValue={setValue}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
