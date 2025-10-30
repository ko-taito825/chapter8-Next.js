"use client";
import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";
export default function Header() {
  return (
    <header className={styles.header}>
      <ul className={styles.headerMenu}>
        <li>
          <Link href={"/"}>Blog</Link>
        </li>
        <li>
          <Link href={"/contact"}>お問い合わせ</Link>
        </li>
      </ul>
    </header>
  );
}
