"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Sidebar.module.css"; // CSS module

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const isShopActive =
    pathname.startsWith("/shop") || pathname.startsWith("/product");

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`${styles.sidebar} ${
        isOpen ? styles.open : styles.collapsed
      }`}
    >
      <div className={styles.menuA}>
        {isOpen && <h3>Menu</h3>}
        <div className={styles.hamburger} onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link
            href="/shop"
            className={`${styles.link} ${isShopActive ? styles.active : ""}`}
          >
            <img
              src="/img/PinClipart.png"
              alt="shop"
              className={styles.img}
            />
            {isOpen && <span className={styles.sidebarText}>Shop</span>}
          </Link>
        </li>

        <li className={styles.li}>
          <Link
            href="/cart"
            className={`${styles.link} ${
              pathname === "/cart" ? styles.active : ""
            }`}
          >
            <img src="/img/cart.png" alt="cart" className={styles.img} />
            {isOpen && <span className={styles.sidebarText}>Cart</span>}
          </Link>
        </li>

        <li className={styles.li}>
          <Link
            href="/profile"
            className={`${styles.link} ${
              pathname === "/profile" ? styles.active : ""
            }`}
          >
            <img src="/img/person.png" alt="profile" className={styles.img} />
            {isOpen && <span className={styles.sidebarText}>My Profile</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
}
