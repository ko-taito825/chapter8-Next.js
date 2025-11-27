import { Category } from "../../../_types/Category";
import React, { ChangeEvent, useEffect, useState } from "react";
import SelectForm from "./SelectForm";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
type PostFormProps = {
  mode: "new" | "edit";
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  thumbnailImageKey: string;
  setThumbnailImageKey: (thumbnailImageKey: string) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
  isloading: boolean;
};
export default function PostForm({
  mode,
  title,
  setTitle,
  content,
  setContent,
  categories,
  setCategories,
  onSubmit,
  onDelete,
  isloading,
  thumbnailImageKey,
  setThumbnailImageKey,
}: PostFormProps) {
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
    null
  );

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!event.target.files || event?.target.files.length == 0) {
      return;
    }
    const file = event.target.files[0]; //選択された画像を取得
    const filePath = `private/${uuidv4()}`;
    const { data, error } = await supabase.storage
      .from("post_thumbnail")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      alert(error.message);
      return;
    }
    setThumbnailImageKey(data.path);
  };

  useEffect(() => {
    if (!thumbnailImageKey) {
      console.log("キーが見つかりません。");
      return; // デバッグ用
    }

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post_thumbnail")
        .getPublicUrl(thumbnailImageKey);
      setThumbnailImageUrl(publicUrl);
      console.log("publicUrl", publicUrl);
    };
    fetcher();
  }, [thumbnailImageKey]);
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
          disabled={isloading}
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
          disabled={isloading}
        ></textarea>
      </div>
      <div className="mt-10">
        <label htmlFor="thumbnailImageKey">サムネイルURL</label>
        <input
          type="file"
          id="thumbnailImageKey"
          onChange={handleImageChange}
          disabled={isloading}
        />
        {thumbnailImageUrl && (
          <div className="mt-2">
            <Image
              src={thumbnailImageUrl}
              alt="thumbnail"
              width={400}
              height={400}
            />
          </div>
        )}
      </div>
      <div className="mt-10 ">
        <label htmlFor="thumbnailUrl">カテゴリー</label>
        <SelectForm
          selectedCategories={categories}
          setSelectedCategories={setCategories}
          isloading={isloading}
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
    </form>
  );
}
