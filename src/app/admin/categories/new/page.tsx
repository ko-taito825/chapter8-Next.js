"use client";
import React, { useState } from "react";
import CategoryForm from "../_components/CategoryForm";
import { useRouter } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { CategoryFormData } from "@/app/_types/form";
import { useForm } from "react-hook-form";

export default function page() {
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);
  const { token } = useSupabaseSession();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: { title: "" },
  });
  const onSubmit = async (data: CategoryFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        } as Record<string, string>,
        body: JSON.stringify({ name: data.title }),
      });
      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }
    } catch (error) {
      console.error("カテゴリー作成エラー:", error);
      alert("カテゴリーの作成に失敗しました");
      return;
    } finally {
      setIsLoading(false);
    }

    router.push(`/admin/categories`);
    alert("カテゴリーを作成しました");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-bold text-2xl">カテゴリー作成</h1>
      </div>
      <CategoryForm
        mode="new"
        initialName={""}
        onSubmit={onSubmit}
        isloading={isloading}
      />
    </div>
  );
}
