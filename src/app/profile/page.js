"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
  const [companyAddress, setCompanyAddress] = useState(
    "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi"
  );
  const [homeAddress, setHomeAddress] = useState(
    "15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi"
  );

  const companyRef = useRef(null);
  const homeRef = useRef(null);

  const [sex, setSex] = useState("Male");
  const [openSex, setOpenSex] = useState(false);

  // Hàm auto resize
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

  return (
    <div className={styles.profileWrapper}>
      <Header />
      <div className={styles.mainLayout}>
        <Sidebar />
        <div className={styles.profileContent}>
          <div className={styles.profileTitle}>
            <span className={styles.profileTitleText}>My Profile</span>
          </div>

          <div className={styles.profileCard}>
            <div className={styles.profileInfo}>
              <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>
                  <img src="/img/avatar.png" alt="User Avatar" />
                </div>
                <div className={styles.profileHeaderRight}>
                  <h3>MR. USER</h3>
                  <p>Email: user@gmail.com</p>
                </div>
              </div>

              <div className={styles.profileDetails}>
                <div className={styles.profileRow}>
                  <label className={styles.label}>Date of birth:</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type="date"
                      className={styles.inputText}
                      defaultValue="2018-01-01"
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
                    onClick={() => setOpenSex(!openSex)} // toggle menu khi click
                  >
                    {sex}
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={styles.arrowIcon}
                    />
                    {openSex && (
                      <div className={styles.dropdown}>
                        <div
                          className={styles.dropdownItem}
                          onClick={() => {
                            setSex("Male");
                            setOpenSex(false);
                          }}
                        >
                          Male
                        </div>
                        <div
                          className={styles.dropdownItem}
                          onClick={() => {
                            setSex("Female");
                            setOpenSex(false);
                          }}
                        >
                          Female
                        </div>
                        <div
                          className={styles.dropdownItem}
                          onClick={() => {
                            setSex("Other");
                            setOpenSex(false);
                          }}
                        >
                          Other
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
