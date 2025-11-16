import { Category } from "@prisma/client";
import React from "react";
import SelectForm from "./SelectForm";

type PostFormProps = {
  mode: "new" | "edit";
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  thumbnailUrl: string;
  setThumbnailUrl: (value: string) => void;
  categories: number[];
  setCategories: (categories: number[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
};
export default function PostForm({
  mode,
  title,
  setTitle,
  content,
  setContent,
  thumbnailUrl,
  setThumbnailUrl,
  categories,
  setCategories,
  onSubmit,
  onDelete,
}: PostFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mt-10">
        <label htmlFor="title">タイトル</label>
        <input
          className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-10">
        <label htmlFor="content">内容</label>
        <textarea
          className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          name=""
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="mt-10">
        <label htmlFor="thumbnailUrl">サムネイルURL</label>
        <input
          className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          type="text"
          id="thumbnailUrl"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
        />
      </div>
      <div className="mt-10 ">
        <label htmlFor="thumbnailUrl">カテゴリー</label>
        <SelectForm
          selectedCategories={categories}
          setSelectedCategories={setCategories}
        />
      </div>

      <button
        className={`px-4 py-2 rounded-md text-white font-semibold 
      ${
        mode === "new"
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-blue-500 hover:bg-blue-600"
      }
      transition-colors duration-200`}
        type="submit"
      >
        {mode === "new" ? "作成" : "更新"}
      </button>
      {mode === "edit" && (
        <button
          className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-200"
          type="button"
          onClick={onDelete}
        >
          削除
        </button>
      )}
    </form>
  );
}
