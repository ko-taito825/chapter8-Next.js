"use client";
import Link from "next/link";
import React from "react";
import "../globals.css";
import { useRouteGuard } from "../_hooks/useRouteGuard";

export default function layout({ children }: { children: React.ReactNode }) {
  useRouteGuard();
  return (
    <>
      <div className="flex">
        <aside className="w-1/5 h-[calc(100vh-64px)] bg-gray-300 border-r">
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin/posts"
                  className="block px-3 py-4 rounded hover:bg-blue-200"
                >
                  記事一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/categories"
                  className="block px-3 py-4 rounded hover:bg-blue-200 "
                >
                  カテゴリー一覧
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="flex-1 p-10">{children}</div>
      </div>
    </>
  );
}
