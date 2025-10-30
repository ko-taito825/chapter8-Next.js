"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "./types/post";
import styles from "./styles/page.module.css";
export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetcher = async () => {
      try {
        const res = await fetch(
          "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts"
        );
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
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
                    {category}
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
