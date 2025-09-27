"use client";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice"; // ✅ import action
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import styles from "./page.module.css";
import products from "../../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className={styles.productDetail}>
        <p>Không tìm thấy sản phẩm</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // ✅ đưa sản phẩm vào Redux
  };

  return (
    <div className={styles.productDetail}>
      <Header />

      <div className={styles.mainLayout}>
        <Sidebar />

        {/* Nội dung product */}
        <div className={styles.productContent}>
          <div className={styles.productHeader}>
            <div className={styles.headerUp}>
              <span>Shop</span>
            </div>
            <div className={styles.headerDown}>
              <div className={styles.headerDownLeft}>
                <span>Shop / Product</span>
              </div>
              <div className={styles.headerDownRight}>
                {/* 🛒 Icon giỏ hàng ở Header đã có badge động */}
                <img src="/img/cart2.png" alt="cart" />
              </div>
            </div>
          </div>

          <div className={styles.productWrapper}>
            <div className={styles.productDetailImg}>
              <img src={product.img} alt={product.name} />
              <div className={styles.productDetailImgType}>
                <img src="/img/capture.png" alt="capture" />
              </div>
            </div>

            <div className={styles.productInfo}>
              <div className={styles.productDesc}>
                <h2>{product.name}</h2>
                <p>{product.desc}</p>
                <div className={styles.price}>
                  {product.price.toLocaleString()} VND
                </div>
              </div>

              <div className={styles.stars}>
                {Array.from({ length: product.stars || 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <div className={styles.productActions}>
                <button className={styles.btnBuy}>Mua Ngay</button>
                <button
                  className={styles.btnCart}
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
