"use client";
import { removeFromCart, updateQty, setCart } from "../../redux/cartSlice";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const authUser = useSelector((state) => state.auth.user);
  // ✅ BƯỚC 1: Load user và cart RIÊNG của user
  useEffect(() => {
    if (!authUser) {
      router.push("/login");
      return;
    }
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      setUser(userObj);

      // 👉 Load cart theo user.id
      const savedCart = localStorage.getItem(`cart_${userObj.id}`);
      if (savedCart) {
        dispatch(setCart(JSON.parse(savedCart)));
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  // ✅ BƯỚC 2: Lưu cart vào localStorage theo user.id
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  if (!user) {
    return null;
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className={styles.cartWrapper}>
      <div className={styles.mainLayout}>
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
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        X
                      </button>
                    </div>
                    <div className={styles.qtyControl}>
                      <button
                        onClick={() =>
                          dispatch(updateQty({ id: item.id, type: "minus" }))
                        }
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() =>
                          dispatch(updateQty({ id: item.id, type: "plus" }))
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