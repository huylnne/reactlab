"use client";
import styles from "./page.module.css";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/cartSlice"; // ✅ import Redux action

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:5000/users?username=${username}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const user = data[0];

        // ✅ Lưu user vào localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Load cart của user vào Redux
        dispatch(setCart(user.cart || []));

        alert("Đăng nhập thành công: " + user.username);
        router.push("/shop");
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
      }
    } catch (err) {
      console.error("Lỗi gọi API:", err);
      alert("Có lỗi xảy ra!");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <img src="/img/logo.png" alt="logo" />

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <FaUserCircle />
            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <IoIosLock />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.unseen}>
              <FaRegEyeSlash />
            </div>
          </div>

          <div className={styles.formOptions}>
            <label>
              <input type="checkbox" /> Lưu đăng nhập
            </label>
            <a href="/">Bạn quên mật khẩu?</a>
          </div>

          <button type="submit" className={styles.loginBtn}>
            Đăng nhập
          </button>
        </form>

        <p className={styles.loginFooter}>
          Nếu bạn có thắc mắc hay cần giải đáp, vui lòng liên hệ số điện thoại{" "}
          <span className={styles.underline}>19001000</span>
          <br />
          Bản quyền thuộc về AnyBim
        </p>
      </div>
    </div>
  );
}
