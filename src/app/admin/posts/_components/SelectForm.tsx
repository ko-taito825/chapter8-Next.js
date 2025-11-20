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

interface Props {
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
  isloading: boolean;
}

export default function SelectForm({
  selectedCategories,
  setSelectedCategories,
  isloading,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  const handleChange = (e: SelectChangeEvent<number[]>) => {
    const ids = e.target.value as number[];
    const selected = categories.filter((c) => ids.includes(c.id));
    setSelectedCategories(selected);
  };

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/admin/categories");
      const { categories } = await res.json();
      setCategories(categories);
    };
    fetcher();
  }, []);

  return (
    <FormControl className="w-full" disabled={isloading}>
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
