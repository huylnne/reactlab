"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { FaChevronDown } from "react-icons/fa";

export default function FilterPage() {
  // state giá trị đã chọn
  const [minPrice, setMinPrice] = useState("0 VNĐ");
  const [maxPrice, setMaxPrice] = useState("10 000 000 VNĐ");
  const [minStar, setMinStar] = useState("0 sao");
  const [maxStar, setMaxStar] = useState("5 sao");

  // state dropdown mở/đóng
  const [openDropdown, setOpenDropdown] = useState(null);

  // danh sách option
  const priceOptions = [
    "0 VNĐ",
    "1 000 000 VNĐ",
    "2 000 000 VNĐ",
    "5 000 000 VNĐ",
    "10 000 000 VNĐ",
  ];
  const starOptions = ["0 sao", "1 sao", "2 sao", "3 sao", "4 sao", "5 sao"];

  // chọn option
  const handleSelect = (setter, value) => {
    setter(value);
    setOpenDropdown(null); // đóng dropdown
  };

  return (
    <div className={styles.filterBox}>
      <div className={styles.filterHeader}>
        <h3>Filter</h3>
      </div>

      {/* Filter Giá */}
      <div className={styles.filterSection}>
        <div className={styles.filterDesc}>
          <label>Giá</label>
        </div>

        {/* Từ */}
        <div className={styles.filterFromto}>
          <label>Từ:</label>
          <div className={styles.priceWithIc}>
            <span onClick={() =>
              setOpenDropdown(openDropdown === "minPrice" ? null : "minPrice")
            }>
              {minPrice}
            </span>
            <FaChevronDown
              onClick={() =>
                setOpenDropdown(openDropdown === "minPrice" ? null : "minPrice")
              }
            />
            {openDropdown === "minPrice" && (
              <ul className={styles.dropdown}>
                {priceOptions.map((p) => (
                  <li key={p} onClick={() => handleSelect(setMinPrice, p)}>
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Đến */}
        <div className={styles.filterFromto}>
          <label>Đến:</label>
          <div className={styles.priceWithIc}>
            <span onClick={() =>
              setOpenDropdown(openDropdown === "maxPrice" ? null : "maxPrice")
            }>
              {maxPrice}
            </span>
            <FaChevronDown
              onClick={() =>
                setOpenDropdown(openDropdown === "maxPrice" ? null : "maxPrice")
              }
            />
            {openDropdown === "maxPrice" && (
              <ul className={styles.dropdown}>
                {priceOptions.map((p) => (
                  <li key={p} onClick={() => handleSelect(setMaxPrice, p)}>
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Filter Đánh giá */}
      <div className={styles.filterSection}>
        <div className={styles.filterDesc}>
          <label>Đánh giá</label>
        </div>

        {/* Từ */}
        <div className={styles.filterFromto}>
          <label>Từ:</label>
          <div className={styles.priceWithIc}>
            <span onClick={() =>
              setOpenDropdown(openDropdown === "minStar" ? null : "minStar")
            }>
              {minStar}
            </span>
            <FaChevronDown
              onClick={() =>
                setOpenDropdown(openDropdown === "minStar" ? null : "minStar")
              }
            />
            {openDropdown === "minStar" && (
              <ul className={styles.dropdown}>
                {starOptions.map((s) => (
                  <li key={s} onClick={() => handleSelect(setMinStar, s)}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Đến */}
        <div className={styles.filterFromto}>
          <label>Đến:</label>
          <div className={styles.priceWithIc}>
            <span onClick={() =>
              setOpenDropdown(openDropdown === "maxStar" ? null : "maxStar")
            }>
              {maxStar}
            </span>
            <FaChevronDown
              onClick={() =>
                setOpenDropdown(openDropdown === "maxStar" ? null : "maxStar")
              }
            />
            {openDropdown === "maxStar" && (
              <ul className={styles.dropdown}>
                {starOptions.map((s) => (
                  <li key={s} onClick={() => handleSelect(setMaxStar, s)}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
