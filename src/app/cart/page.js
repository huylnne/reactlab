"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import products from "../data/products";

export default function CartPage() {
  const [cart, setCart] = useState(
    products.map((item) => ({ ...item, qty: 1 }))
  );

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: type === "plus" ? item.qty + 1 : Math.max(1, item.qty - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className={styles.cartWrapper}>
      <Header />
      <div className={styles.mainLayout}>
        <Sidebar />

        {/* Content */}
        <div className={styles.cartContent}>
          <div className={styles.cartHeader}>
            <div className={styles.cartText}>
              <h2>Cart</h2>
            </div>
            <div className={styles.cartNumItem}>
              <p>{cart.length} items in bag</p>
            </div>
          </div>

          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              {/* Cột trái: ảnh */}
              <img src={item.img} alt={item.name} />

              {/* Cột phải: chi tiết + actions */}
              <div className={styles.cartRight}>
                <div className={styles.cartDetails}>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  <div className={styles.cartPrice}>
                    {item.price.toLocaleString()} VND
                  </div>
                </div>

                <div className={styles.cartActions}>
                  <div className={styles.removeBtnWrapper}>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItem(item.id)}
                    >
                      X
                    </button>
                  </div>
                  <div className={styles.qtyControl}>
                    <button onClick={() => updateQty(item.id, "minus")}>
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, "plus")}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Tổng kết */}
          <div className={styles.cartSummary}>
            <div className={styles.summaryRow}>
              <span className={styles.label}>SubTotal</span>
              <span className={styles.value}>
                {subtotal.toLocaleString()} VND
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.label}>Tax</span>
              <span className={styles.value}>{tax.toLocaleString()} VND</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span className={styles.label}>Total</span>
              <span className={styles.value}>{total.toLocaleString()} VND</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
