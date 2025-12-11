"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import { Post } from "../../_types/post";
import { supabase } from "@/utils/supabase";
export default function page() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
    null
  );
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(`/api/posts/${id}`, {
        headers: {
          "X-MICROCMS-API-KEY": process.env
            .NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      });
      const data = await res.json();
      console.log("データ", data);
      setPost(data.post);
      setLoading(false);
    };
    fetcher();
  }, [id]);

  useEffect(() => {
    if (!post?.thumbnailImageKey) return;

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post_thumbnail")
        .getPublicUrl(post.thumbnailImageKey);

      setThumbnailImageUrl(publicUrl);
    };
    fetcher();
  }, [post?.thumbnailImageKey]);
  if (loading) return <p>読み込み中...</p>;
  if (!post) return <p>記事が見つかりません</p>;
  return (
    <div className={styles.wrapper}>
      {thumbnailImageUrl && (
        <Image
          className={styles.detailImg}
          src={thumbnailImageUrl}
          alt={post.title}
          width={800}
          height={800}
        />
      )}

      <p>{new Date(post.createdAt).toLocaleDateString("ja-jp")}</p>
      <div className={styles.categoryItems}>
        {post.postCategories.map((pc, catIndex) => (
          <span key={catIndex} className={styles.categoryItem}>
            {pc.category.name}
          </span>
        ))}
      </div>
      <h2 className="font-bold">{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
