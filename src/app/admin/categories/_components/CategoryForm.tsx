import React from "react";

interface Props {
  mode: "new" | "edit";
  name: string;
  setName: (title: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
  isloading: boolean;
}

export default function CategoryForm({
  mode,
  name,
  setName,
  onSubmit,
  onDelete,
  isloading,
}: Props) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">カテゴリー名</label>
        <input
          className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          type="text"
          id="title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isloading}
        />
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
