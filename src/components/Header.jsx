"use client";

import styles from "./Header.module.css"; // import module css
import Link from "next/link"; 
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <img src="/img/logo.png" alt="logo" className={styles.logo} />
        <h1>Mobile Shopping</h1>
      </div>
      <div className={styles.headerRight}>
      <Link href="/profile">
          <img src="/img/avatar.png" alt="avatar" className={styles.avatar} />
        </Link>
      </div>
    </header>
  );
}
