"use client";
import styles from "./page.module.css";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <img src="/img/logo.png" alt="logo" />

        <form className={styles.loginForm}>
          <div className={styles.formGroup}>
            <FaUserCircle />
            <input type="text" placeholder="Tên đăng nhập" />
          </div>

          <div className={styles.formGroup}>
            <IoIosLock />
            <input type="password" placeholder="Mật khẩu" />
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
