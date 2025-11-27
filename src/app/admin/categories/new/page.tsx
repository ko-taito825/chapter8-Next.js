"use client";
import React, { useState } from "react";
import CategoryForm from "../_components/CategoryForm";
import { useRouter } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

export default function page() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);
  const { token } = useSupabaseSession();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        } as Record<string, string>,
        body: JSON.stringify({ name }),
      });
      console.log(res);
      const { id } = await res.json();
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
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        isloading={isloading}
      />
    </div>
  );
}
