"use client";
import { removeFromCartAsync,updateQtyAsync } from "../../redux/cartActions";
import styles from "./page.module.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {updateQty } from "../../redux/cartSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function CartPage() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState(null);

  // ✅ check login
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // ❌ chưa login -> chuyển sang login
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return null; // chờ redirect
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className={styles.cartWrapper}>
      <Header />
      <div className={styles.mainLayout}>
        <Sidebar />

        <div className={styles.cartContent}>
          <div className={styles.cartHeader}>
            <div className={styles.cartText}>
              <h2>Cart</h2>
            </div>
            <div className={styles.cartNumItem}>
              <p>{cart.length} items in bag</p>
            </div>
          </div>

          {cart.length === 0 ? (
            <p>Giỏ hàng trống</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.img} alt={item.name} />

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
                        onClick={() => dispatch(removeFromCartAsync(item.id))}
                      >
                        X
                      </button>
                    </div>
                    <div className={styles.qtyControl}>
                      <button
                        onClick={() =>
                          dispatch(updateQtyAsync({ id: item.id, type: "minus" }))
                        }
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() =>
                          dispatch(updateQtyAsync({ id: item.id, type: "plus" }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

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
