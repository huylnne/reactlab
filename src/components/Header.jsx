"use client";

import styles from "./Header.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
// ❌ XÓA DÒNG NÀY: import { resetCart } from "../redux/cartSlice";
import { LOGOUT } from "../redux/actions/authActions"; 

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {  
    // ✅ Chỉ xóa "user", KHÔNG xóa cart
 

    // ✅ Gọi logout trong Redux
    dispatch({ type: LOGOUT });

    // ❌ KHÔNG làm 3 dòng sau:
    // localStorage.clear();
    // persistor.purge();
    // dispatch(resetCart());

    router.push("/login");
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