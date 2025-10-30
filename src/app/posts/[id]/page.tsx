"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MicroCmsPost } from "@/app/_types/MicroCmsPost";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
export default function page() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://4hy8bu3cgn.microcms.io/api/v1/posts/${id}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      );
      const data = await res.json();
      console.log("データ", data);
      setPost(data);
      setLoading(false);
    };
    fetcher();
  }, [id]);

  if (loading) return <p>読み込み中...</p>;
  if (!post) return <p>記事が見つかりません</p>;
  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.detailImg}
        src={post.thumbnail.url}
        alt={post.title}
        width={800}
        height={400}
      />
      <p>{new Date(post.createdAt).toLocaleDateString("ja-jp")}</p>
      <div className={styles.categoryItems}>
        {post.categories.map((category, catIndex) => (
          <span key={catIndex} className={styles.categoryItem}>
            {category.name}
          </span>
        ))}
      </div>
      <h2>APIで取得した{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
