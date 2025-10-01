"use client";
import { Button } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../../redux/cartSlice";
import styles from "./page.module.css";
import products from "../../data/products";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);
  
  // 👉 Lấy user từ Redux (trạng thái đăng nhập thực tế)
  const authUser = useSelector((state) => state.auth.user);

  // ✅ Chỉ tính cartCount nếu đã đăng nhập
  const cartCount = authUser ? cartItems.reduce((sum, item) => sum + item.qty, 0) : 0;

  // Load user từ localStorage (chỉ để hiển thị tên, v.v.)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, []);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className={styles.productDetail}>
        <p>Không tìm thấy sản phẩm</p>
      </div>
    );
  }

  const updateCart = (newCart) => {
    dispatch(setCart(newCart));
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(newCart));
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    const exist = cartItems.find((i) => i.id === product.id);
    let newCart;
    if (exist) {
      newCart = cartItems.map((i) =>
        i.id === product.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      newCart = [...cartItems, { ...product, qty: 1 }];
    }

    updateCart(newCart);
    router.push("/cart");
  };

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    const exist = cartItems.find((i) => i.id === product.id);
    let newCart;
    if (exist) {
      newCart = cartItems.map((i) =>
        i.id === product.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      newCart = [...cartItems, { ...product, qty: 1 }];
    }

    updateCart(newCart);

    const img = document.querySelector(`.${styles.productDetailImg} img`);
    const cartIcon = document.querySelector(`.${styles.headerDownRight} img`);

    if (!img || !cartIcon) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyingImg = img.cloneNode(true);
    flyingImg.style.position = "fixed";
    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";
    flyingImg.style.transition = "all 0.8s ease-in-out";
    flyingImg.style.zIndex = 9999;
    document.body.appendChild(flyingImg);

    requestAnimationFrame(() => {
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.width = "20px";
      flyingImg.style.height = "20px";
      flyingImg.style.opacity = 0.3;
    });

    flyingImg.addEventListener("transitionend", () => {
      flyingImg.remove();
    });
  };

  return (
    <div className={styles.productDetail}>
      <div className={styles.mainLayout}>
        <div className={styles.productContent}>
          <div className={styles.productHeader}>
            <div className={styles.headerUp}>
              <Button icon={<LeftOutlined />} onClick={() => router.push("/shop")}>
              </Button>
            </div>
            <div className={styles.headerDown}>
              <div className={styles.headerDownLeft}>
                <span>Shop / Product</span>
              </div>
              <div className={styles.headerDownRight}>
                <img src="/img/cart2.png" alt="cart" />
                {cartCount > 0 && (
                  <span className={styles.cartBadge}>{cartCount}</span>
                )}
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
                <button className={styles.btnBuy} onClick={handleBuyNow}>
                  Mua Ngay
                </button>
                <button className={styles.btnCart} onClick={handleAddToCart}>
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