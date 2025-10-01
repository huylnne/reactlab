"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { Button, message } from "antd";   // ✅ dùng AntD message

export default function ProfilePage() {
  const companyRef = useRef(null);
  const homeRef = useRef(null);

  const [user, setUser] = useState(null);

 
  const [dob, setDob] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [sex, setSex] = useState("Male");
  const [openSex, setOpenSex] = useState(false);

  const router = useRouter();


  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setDob(parsed.dob || "");
      setCompanyAddress(parsed.companyAddress || "");
      setHomeAddress(parsed.homeAddress || "");
      setSex(parsed.sex || "Male");
    } else {
      router.push("/login");
    }
  }, [router]);

  
  useEffect(() => {
    if (companyRef.current) {
      companyRef.current.style.width = "auto";
      companyRef.current.style.width = companyRef.current.scrollWidth + "px";
    }
  }, [companyAddress]);

  useEffect(() => {
    if (homeRef.current) {
      homeRef.current.style.width = "auto";
      homeRef.current.style.width = homeRef.current.scrollWidth + "px";
    }
  }, [homeAddress]);

 
  const handleSave = async () => {
    if (!user) return;

    const updates = {
      ...user,             
      dob,
      companyAddress,
      homeAddress,
      sex,
    };

    try {
      const res = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("PATCH thất bại");

      const updatedUser = await res.json();

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Updated!")
    } catch (err) {
      console.error("Lỗi khi lưu:", err);
      message.error("Cập nhật thất bại ❌");
    }
  };

  if (!user) return null;

  return (
    <div className={styles.profileWrapper}>
      
      <div className={styles.mainLayout}>
      
        <div className={styles.profileContent}>
          <div className={styles.profileTitle}>
            <span className={styles.profileTitleText}>My Profile</span>
          </div>

          <div className={styles.profileCard}>
            <div className={styles.profileInfo}>
              <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>
                  <img src={user.avatar || "/img/avatar.png"} alt="User Avatar" />
                </div>
                <div className={styles.profileHeaderRight}>
                  <h3>{user.username.toUpperCase()}</h3>
                  <p>Email: {user.email || "user@gmail.com"}</p>
                </div>
              </div>

              <div className={styles.profileDetails}>
                {/* Date of birth */}
                <div className={styles.profileRow}>
                  <label className={styles.label}>Date of birth:</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="date"
                      className={styles.inputText}
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                    <img
                      src="/img/hiclipart.png"
                      alt="calendar"
                      className={styles.iconCalendar}
                    />
                  </div>
                </div>

                {/* Address company */}
                <div className={styles.profileRow}>
                  <span className={styles.label}>Address Company:</span>
                  <div className={styles.field}>
                    <input
                      type="text"
                      ref={companyRef}
                      className={styles.inputText}
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                    />
                  </div>
                </div>

                {/* Address home */}
                <div className={styles.profileRow}>
                  <span className={styles.label}>Address Home:</span>
                  <div className={styles.field}>
                    <input
                      type="text"
                      ref={homeRef}
                      className={styles.inputText}
                      value={homeAddress}
                      onChange={(e) => setHomeAddress(e.target.value)}
                    />
                  </div>
                </div>

                {/* Sex */}
                <div className={styles.profileRow}>
                  <label className={styles.label}>Sex:</label>
                  <div
                    className={styles.field}
                    onClick={() => setOpenSex(!openSex)}
                  >
                    {sex}
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={styles.arrowIcon}
                    />
                    {openSex && (
                      <div className={styles.dropdown}>
                        {["Male", "Female", "Other"].map((opt) => (
                          <div
                            key={opt}
                            className={styles.dropdownItem}
                            onClick={() => {
                              setSex(opt);
                              setOpenSex(false);
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Save button */}
                <div className={styles.profileRow} style={{ marginTop: "20px" }}>
                  <Button type="primary" onClick={handleSave}>
                    Save
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}
