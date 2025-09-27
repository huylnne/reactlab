"use client";
import styles from "./Filter.module.css";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

export default function FilterBox({ onFilterChange }) {
  // state giá trị đã chọn (hiển thị text)
  const [minPrice, setMinPrice] = useState("0 VNĐ");
  const [maxPrice, setMaxPrice] = useState("10 000 000 VNĐ");
  const [minStar, setMinStar] = useState("0 sao");
  const [maxStar, setMaxStar] = useState("5 sao");

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

  // helper: chuyển text => number
  const parsePrice = (text) => parseInt(text.replace(/\D/g, "")) || 0;
  const parseStar = (text) => parseInt(text.replace(/\D/g, "")) || 0;

  // chọn option
  const handleSelect = (setter, value, type) => {
    setter(value);

    if (onFilterChange) {
      let newFilter = {
        minPrice: parsePrice(minPrice),
        maxPrice: parsePrice(maxPrice),
        minStar: parseStar(minStar),
        maxStar: parseStar(maxStar),
      };

      // cập nhật field vừa chọn
      if (type === "minPrice") newFilter.minPrice = parsePrice(value);
      if (type === "maxPrice") newFilter.maxPrice = parsePrice(value);
      if (type === "minStar") newFilter.minStar = parseStar(value);
      if (type === "maxStar") newFilter.maxStar = parseStar(value);

      onFilterChange(newFilter);
    }

    setOpenDropdown(null);
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
            <span
              onClick={() =>
                setOpenDropdown(openDropdown === "minPrice" ? null : "minPrice")
              }
            >
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
                  <li
                    key={p}
                    onClick={() => handleSelect(setMinPrice, p, "minPrice")}
                  >
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
            <span
              onClick={() =>
                setOpenDropdown(openDropdown === "maxPrice" ? null : "maxPrice")
              }
            >
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
                  <li
                    key={p}
                    onClick={() => handleSelect(setMaxPrice, p, "maxPrice")}
                  >
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
            <span
              onClick={() =>
                setOpenDropdown(openDropdown === "minStar" ? null : "minStar")
              }
            >
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
                  <li
                    key={s}
                    onClick={() => handleSelect(setMinStar, s, "minStar")}
                  >
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
            <span
              onClick={() =>
                setOpenDropdown(openDropdown === "maxStar" ? null : "maxStar")
              }
            >
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
                  <li
                    key={s}
                    onClick={() => handleSelect(setMaxStar, s, "maxStar")}
                  >
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
