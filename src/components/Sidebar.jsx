"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  // ✅ Auto open/collapse theo breakpoint (<=768px là mobile)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setIsOpen(!mq.matches); // mobile => false, desktop => true

    apply(); // chạy ngay khi mount

    // cross-browser listener
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  const toggleSidebar = () => setIsOpen((v) => !v);

  const isShopActive =
    pathname.startsWith("/shop") || pathname.startsWith("/product");

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : styles.collapsed}`}>
      <div className={styles.menuA}>
        {isOpen && <h3>Menu</h3>}
        <div className={styles.hamburger} onClick={toggleSidebar} aria-label="Toggle sidebar">
          <span></span><span></span><span></span>
        </div>
      </div>

      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link href="/shop" className={`${styles.link} ${isShopActive ? styles.active : ""}`}>
            <img src="/img/PinClipart.png" alt="shop" className={styles.img} />
            {isOpen && <span className={styles.sidebarText}>Shop</span>}
          </Link>
        </li>

        <li className={styles.li}>
          <Link href="/cart" className={`${styles.link} ${pathname === "/cart" ? styles.active : ""}`}>
            <img src="/img/cart.png" alt="cart" className={styles.img} />
            {isOpen && <span className={styles.sidebarText}>Cart</span>}
          </Link>
        </li>

        <li className={styles.li}>
          <Link href="/profile" className={`${styles.link} ${pathname === "/profile" ? styles.active : ""}`}>
            <img src="/img/person.png" alt="profile" className={styles.img} />
            {isOpen && <span className={styles.sidebarText}>My Profile</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}
