"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Post } from "@/app/types/post";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
export default function page() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(
          `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
        );
        const data = await res.json();
        setPost(data.post);
      } catch (error) {
        console.log("データの取得に失敗しました", error);
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, [id]);

  if (loading) return <p>読み込み中...</p>;
  if (!post) return <p>記事が見つかりません</p>;
  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.detailImg}
        src={post.thumbnailUrl}
        alt={post.title}
        width={800}
        height={400}
      />
      <p>{new Date(post.createdAt).toLocaleDateString("ja-jp")}</p>
      <div className={styles.categoryItems}>
        {post.categories.map((category: string, catIndex: number) => (
          <span key={catIndex} className={styles.categoryItem}>
            {category}
          </span>
        ))}
      </div>
      <h2>APIで取得した{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
