"use client";
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Box,
  Chip,
} from "@mui/material";
import { Category } from "../../../_types/Category";
import { useFetch } from "@/app/_hooks/useFetch";

interface Props {
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
  isSubmitting: boolean;
}

export default function SelectForm({
  selectedCategories,
  setSelectedCategories,
  isSubmitting,
}: Props) {
  const { data, error, isLoading } = useFetch<{ categories: Category[] }>(
    "/api/admin/categories",
    "categories"
  );

  console.log("デバッグ用APIの生データ", data);
  const categories = data as unknown as Category[];

  const handleChange = (e: SelectChangeEvent<number[]>) => {
    if (!categories) return;
    const ids = e.target.value as number[];
    const selected = categories.filter((c) => ids.includes(c.id));
    setSelectedCategories(selected);
  };

  if (error) return <div>取得に失敗しました</div>;
  if (isLoading) return <div>読み込み中...</div>;
  if (!categories) return null;
  console.log("デバッグ", selectedCategories);
  return (
    <FormControl className="w-full" disabled={isSubmitting}>
      <Select
        multiple
        value={selectedCategories.map((c) => c.id)}
        onChange={handleChange}
        input={<OutlinedInput label="カテゴリー" />}
        renderValue={(selected) => (
          <Box>
            {selectedCategories.map((category) => (
              <Chip key={category.id} label={category.name} />
            ))}
          </Box>
        )}
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
