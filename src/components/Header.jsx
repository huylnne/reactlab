"use client";

import styles from "./Header.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { useDispatch } from "react-redux";   // ✅ thêm import
import { clearCart } from "../redux/cartSlice";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch(); // ✅ thêm dispatch

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // ❌ clear user
    dispatch(clearCart());           // ✅ clear cart redux
    setUser(null);
    router.push("/login");           // 👉 quay về login
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <img src="/img/logo.png" alt="logo" className={styles.logo} />
        <h1>Mobile Shopping</h1>
      </div>

      <div className={styles.headerRight}>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/profile">
              <img src="/img/avatar.png" alt="avatar" className={styles.avatar} />
            </Link>
            <Button danger onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        ) : (
          <Button type="primary" onClick={() => router.push("/login")}>
            Đăng nhập
          </Button>
        )}
      </div>
    </header>
  );
}
