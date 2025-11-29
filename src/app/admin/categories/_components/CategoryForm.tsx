import { CategoryFormData } from "@/app/_types/form";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  mode: "new" | "edit";
  initialName: string;
  onSubmit: (data: CategoryFormData) => void;
  onDelete?: () => void;
  isloading: boolean;
}

export default function CategoryForm({
  mode,
  initialName,
  onSubmit,
  onDelete,
  isloading,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: { title: initialName },
  });

  useEffect(() => {
    reset({ title: initialName });
  }, [initialName, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">カテゴリー名</label>
        <input
          className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          type="text"
          id="title"
          {...register("title", { required: "タイトルは必須です" })}
          disabled={isloading}
        />
        <p className="text-red-600">
          {errors.title?.message as React.ReactNode}
        </p>
      </div>
      <div className="flex gap-4 mt-6">
        <button
          className={`px-4 py-2 rounded-md text-white font-semibold 
      ${
        mode === "new"
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-blue-500 hover:bg-blue-600"
      }
      transition-colors duration-200`}
          type="submit"
          disabled={isloading}
        >
          {mode === "new" ? "作成" : "更新"}
        </button>
        {mode === "edit" && (
          <button
            className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-200"
            type="button"
            onClick={onDelete}
            disabled={isloading}
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
}
