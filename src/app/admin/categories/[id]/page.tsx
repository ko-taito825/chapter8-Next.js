"use client";
import React, { useEffect, useState } from "react";
import CategoryForm from "../_components/CategoryForm";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function page() {
  const [name, setName] = useState("");
  const { id } = useParams();
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);
  const { token } = useSupabaseSession();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        } as Record<string, string>,
        body: JSON.stringify({ name }),
      });
    } finally {
      setIsLoading(false);
    }
    alert("カテゴリーを更新しました");
    router.push(`/admin/categories`);
  };

  const handleDelete = async () => {
    //!confirm() => ユーザーがOK押したら削除処理、キャンセルしたら関数終了
    if (!confirm("カテゴリーを削除しますか？")) return; //早期リターンのガード句
    setIsLoading(true);
    try {
      await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        } as Record<string, string>, //headersをキャストして逃げる
      });
    } finally {
      setIsLoading(false);
    }

    alert("カテゴリーを削除しました");
    router.push("/admin/categories");
  };

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      const res = await fetch(`/api/admin/categories/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const { category } = await res.json();
      setName(category.name);
    };
    fetcher();
  }, [id, token]);

  return (
    <div>
      <div>
        <h1>カテゴリー編集</h1>
      </div>
      <CategoryForm
        mode="edit"
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        isloading={isloading}
      />
    </div>
  );
}
