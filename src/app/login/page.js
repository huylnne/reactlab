"use client";
import styles from "./page.module.css";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../redux/actions/authActions";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(form));
  };

  // ✅ Khi đăng nhập thành công (user có giá trị), xử lý lưu user vào localStorage
  useEffect(() => {
    if (user) {
      // 👉 Kiểm tra xem đã có user trong localStorage chưa
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        // ✅ Nếu có → dùng user đã lưu (giữ nguyên profile đã sửa)
        const parsed = JSON.parse(savedUser);
        // Đảm bảo user Redux và localStorage đồng bộ
        localStorage.setItem("user", JSON.stringify(parsed));
      } else {
        // ✅ Nếu chưa → lưu user mới (từ Redux) vào localStorage
        localStorage.setItem("user", JSON.stringify(user));
      }
      router.push("/shop");
    }
  }, [user, router]);

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
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <IoIosLock />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
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

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

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