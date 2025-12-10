"use client";
import Link from "next/link";
import React from "react";
import { supabase } from "@/utils/supabase";
import { useSupabaseSession } from "../_hooks/useSupabaseSession";
import { useRouter } from "next/navigation";

export const Header: React.FC = () => {
  const router = useRouter();
  const { session, isLoading } = useSupabaseSession();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="bg-gray-800 text-white p-6 font-bold flex justify-between items-center">
      {session ? (
        <button
          onClick={handleLogout}
          className="header-link text-xl font-bold"
        >
          Bolg
        </button>
      ) : (
        <Link href="/" className="header-link">
          Blog
        </Link>
      )}

      {!isLoading && (
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/admin" className="header-link">
                管理画面
              </Link>
              <button onClick={handleLogout}>ログアウト</button>
            </>
          ) : (
            <>
              <Link href="/contact" className="header-link">
                お問い合わせ
              </Link>
              <Link href="/login" className="header-link">
                ログイン
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};
