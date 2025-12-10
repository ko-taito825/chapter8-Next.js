"use client";
import React, { useState } from "react";
import CategoryForm from "../_components/CategoryForm";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { CategoryFormData } from "@/app/_types/form";
import { useFetch } from "@/app/_hooks/useFetch";
import { Category } from "@/app/_types/Category";

export default function page() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useSupabaseSession();

  const { data, error, isLoading } = useFetch<{ category: Category }>(
    `/api/admin/categories/${id}`,
    "categories"
  );

  const onSubmit = async (formData: CategoryFormData) => {
    try {
      await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: token ?? "",
        },
        body: JSON.stringify({ name: formData.title }),
      });

      alert("カテゴリーを更新しました");
      router.push(`/admin/categories`);
    } catch (e) {
      console.error(e);
      alert("更新に失敗しました");
    }
  };

  const handleDelete = async () => {
    //!confirm() => ユーザーがOK押したら削除処理、キャンセルしたら関数終了
    if (!confirm("カテゴリーを削除しますか？")) return; //早期リターンのガード句
    try {
      await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ?? "",
        },
      });
      alert("カテゴリーを削除しました");
      router.push("/admin/categories");
    } catch (e) {
      console.error(e);
      alert("削除に失敗しました");
    }
  };

  if (error) return <div>取得に失敗しました</div>;
  if (isLoading) return <div>読み込み中...</div>;
  if (!data) return null;

  return (
    <div>
      <div>
        <h1>カテゴリー編集</h1>
      </div>
      <CategoryForm
        mode="edit"
        initialName={data.category.name}
        onSubmit={onSubmit}
        onDelete={handleDelete}
      />
    </div>
  );
}
