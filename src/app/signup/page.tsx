"use client";

import { supabase } from "@/utils/supabase";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `http://localhost:3000/login`,
        },
      });
      if (error) {
        alert("登録に失敗しました");
      } else {
        alert("確認メールを送信しました。");
      }
    } catch (error) {
      alert("予期せぬエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center pt-[240px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-[400px]"
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            type="email"
            {...register("email", { required: "Emailは必須です" })}
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus;border-blue
            -500 block w-full p-2.5"
            placeholder="name@company.com"
          />
          <p>{errors.email?.message as React.ReactNode}</p>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <input
            type="password"
            {...register("password", { required: "パスワードは必須です" })}
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="......."
          />
          <p>{errors.password?.message as React.ReactNode}</p>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {isLoading ? "送信中..." : " 新規登録"}
          </button>
        </div>
      </form>
    </div>
  );
}
