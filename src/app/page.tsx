"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MicroCmsPost } from "./_types/MicroCmsPost";
import styles from "./_styles/page.module.css";

export default function Home() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetcher = async () => {
      console.log("APIキー:", process.env.NEXT_PUBLIC_MICROCMS_API_KEY);
      const res = await fetch("https://4hy8bu3cgn.microcms.io/api/v1/posts", {
        headers: {
          "X-MICROCMS-API-KEY": process.env
            .NEXT_PUBLIC_MICROCMS_API_KEY as string,
        },
      });

      const { contents } = await res.json();
      setPosts(contents);
      setLoading(false);
    };
    fetcher();
  }, []);

  if (loading) return <p>読み込み中...</p>;
  if (posts.length === 0) return <p>記事が見つかりません</p>;

  return (
    <main>
      <div>
        {posts.map((post) => (
          <Link
            href={`/posts/${post.id}`}
            key={post.id}
            className={styles.postCard}
          >
            <div className={styles.container}>
              <div className={styles.postDate}>
                {new Date(post.createdAt).toLocaleDateString("ja-jp")}
              </div>
              <div className={styles.categoryItems}>
                {post.categories.map((category, catIndex) => (
                  <span key={catIndex} className={styles.categoryItem}>
                    {category.name}
                  </span>
                ))}
              </div>
              <h1>APIで取得した{post.title}</h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content.slice(0, 60) + "...",
                }}
              />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
