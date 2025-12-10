import SelectForm from "./SelectForm";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  Controller,
  useWatch,
} from "react-hook-form";
import { PostInput } from "@/app/_types/post";
import useSWR from "swr";
type PostFormProps = {
  mode: "new" | "edit";
  register: UseFormRegister<PostInput>;
  control: Control<PostInput>;
  errors: FieldErrors<PostInput>;
  setValue: UseFormSetValue<PostInput>;
  onSubmit: (e: React.FormEvent) => void;
  onDelete?: () => void;
  isSubmitting: boolean;
};
export default function PostForm({
  mode,
  register,
  control,
  errors,
  setValue,
  onSubmit,
  onDelete,
  isSubmitting,
}: PostFormProps) {
  const thumbnailImageKey = useWatch({ control, name: "thumbnailImageKey" });
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
      .upload(filePath, file);

    if (error) {
      alert(error.message);
      return;
    }
    setValue("thumbnailImageKey", data.path);
  };
  const fetchThumbnailUrl = async (key: string) => {
    const {
      data: { publicUrl },
    } = await supabase.storage.from("post_thumbnail").getPublicUrl(key);
    return publicUrl;
  };

  const { data: thumbnailImageUrl, isLoading } = useSWR(
    thumbnailImageKey ? thumbnailImageKey : null,
    fetchThumbnailUrl
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="mt-10">
        <label htmlFor="title">タイトル</label>
        <input
          className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          type="text"
          id="title"
          {...register("title", {
            required: "タイトルは必須です",
          })}
          disabled={isLoading}
        />
        <p className="text-red-500">{errors.title?.message}</p>
      </div>
      <div className="mt-10">
        <label htmlFor="content">内容</label>
        <textarea
          className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          id="content"
          {...register("content")}
          disabled={isLoading}
        ></textarea>
      </div>

      <div className="mt-10">
        <label htmlFor="thumbnailImageKey">サムネイルURL</label>
        <input
          type="file"
          id="thumbnailImageKey"
          onChange={handleImageChange}
          disabled={isLoading}
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
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <SelectForm
              selectedCategories={field.value || []}
              setSelectedCategories={field.onChange}
              isSubmitting={isSubmitting}
            />
          )}
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
        disabled={isSubmitting}
      >
        {mode === "new" ? "作成" : "更新"}
      </button>
      {mode === "edit" && (
        <button
          className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors duration-200"
          type="button"
          onClick={onDelete}
          disabled={isSubmitting}
        >
          削除
        </button>
      )}
    </form>
  );
}
