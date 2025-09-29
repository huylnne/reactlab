"use client";
import styles from "./page.module.css";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import FilterBox from "../../components/Filter";
import Link from "next/link";
import { useState,useEffect } from "react";
import productsData from "../data/products"; // import data

export default function ShopPage() {
  const [showFilter, setShowFilter] = useState(false);

  // state search
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  // state filter
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [minStar, setMinStar] = useState(0);
  const [maxStar, setMaxStar] = useState(5);


   useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 1000); 

    return () => clearTimeout(handler); 
  }, [searchTerm]);

  
  const handleFilterChange = (filters) => {
    setMinPrice(filters.minPrice);
    setMaxPrice(filters.maxPrice);
    setMinStar(filters.minStar);
    setMaxStar(filters.maxStar);
  };

  
  const filteredProducts = productsData.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    const matchPrice = item.price >= minPrice && item.price <= maxPrice;
    const matchStar =
      (item.stars || 0) >= minStar && (item.stars || 0) <= maxStar;

    return matchSearch && matchPrice && matchStar;
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.shopContainer}>
        <Header />

        <div className={styles.mainLayout}>
          <Sidebar />

          <div className={styles.shopContent}>
            <div className={styles.shopToolbar}>
              <div className={styles.shopToolbarUp}>
                <span>Shop</span>
              </div>
              <div className={styles.shopToolbarDown}>
                <div className={styles.shopToolbarDownLeft}>
                  <span>Shop</span>
                </div>
                <div className={styles.shopToolbarDownRight}>
                  {/* ✅ Search */}
                  <div className={styles.inputSearch}>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img src="/img/kinhlup.png" alt="search" />
                  </div>
                  <img
                    src="/img/iconfinder.png"
                    alt="filter"
                    className={styles.filterIcon}
                    onClick={() => setShowFilter(!showFilter)}
                  />
                  {showFilter && (
                    <div className={styles.filterWrapper}>
                      <FilterBox onFilterChange={handleFilterChange} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ✅ Render danh sách sản phẩm */}
            <div className={styles.productGrid}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <Link
                    href={`product/${item.id}`}
                    key={item.id}
                    className={styles.productCard}
                  >
                    <div className={styles.productImg}>
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className={styles.productDetail}>
                      <h3>{item.name}</h3>
                      <div className={styles.price}>
                        {item.price.toLocaleString()} VND
                      </div>
                      <div className={styles.stars}>
                        {Array.from({ length: item.stars || 0 }).map((_, i) => (
                          <img
                            key={i}
                            src="/img/image.png"
                            alt="star"
                            className={styles.star}
                          />
                        ))}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className={styles.noResult}>Không tìm thấy sản phẩm nào</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
