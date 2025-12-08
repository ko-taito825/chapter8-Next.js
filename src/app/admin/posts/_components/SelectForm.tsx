"use client";
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Category } from "../../../_types/Category";
import React, { useEffect, useState } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { PostCategory } from "@/app/_types/post";
import useSWR from "swr";

interface Props {
  selectedCategories: PostCategory[];
  setSelectedCategories: (categories: Category[]) => void;
  isSubmitting: boolean;
}

export default function SelectForm({
  selectedCategories,
  setSelectedCategories,
  isSubmitting,
}: Props) {
  const { token } = useSupabaseSession();

  const handleChange = (e: SelectChangeEvent<number[]>) => {
    if (!categories) return;
    const ids = e.target.value as number[];
    const selected = categories.filter((c) => ids.includes(c.id));
    setSelectedCategories(selected);
  };

  const fetcher = async ([url, token]: [string, string]) => {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", Authorization: token },
    });
    if (!res.ok) {
      throw new Error("カテゴリー取得に失敗しました");
    }
    const { categories } = await res.json();
    return categories;
  };
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR<Category[]>(
    token ? ["/api/admin/categories", token] : null,
    fetcher
  );
  if (error) return <div>取得に失敗しました</div>;
  if (!categories) return <div>読み込み中...</div>;
  return (
    <FormControl className="w-full" disabled={isSubmitting}>
      <Select
        multiple
        value={selectedCategories.map((c) => c.id)}
        onChange={handleChange}
        input={<OutlinedInput />}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
