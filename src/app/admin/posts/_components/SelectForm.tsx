"use client";
import {
  Box,
  Chip,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Category } from "@prisma/client";
import React, { useEffect, useState } from "react";

interface Props {
  selectedCategories: number[];
  setSelectedCategories: (categories: number[]) => void;
}

export default function SelectForm({
  selectedCategories,
  setSelectedCategories,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  const handleChange = (value: number[]) => {
    setSelectedCategories(value);
    // console.log("e.target.value", ); //配列：20
  };

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/admin/categories");
      const { categories } = await res.json();
      setCategories(categories);
    };
    fetcher();
  }, []);
  console.log("selectedCategories", selectedCategories);
  return (
    <FormControl className="w-full">
      <Select
        multiple
        value={selectedCategories}
        onChange={(e) => handleChange(e.target.value as number[])}
        // onChange={(e) => handleChange(e.target.value as unknown as number[])}
        input={<OutlinedInput />}

        // renderValue={(selected: string[]) => (
        //   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        //     {selected.map((value: Category) => (
        //       <Chip key={value.id} label={value.name} />
        //     ))}
        //   </Box>
        // )}
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
