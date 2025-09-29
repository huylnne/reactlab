// src/redux/cartActions.js
import { addToCart,setCart } from "./cartSlice";

export const addToCartAsync = (product) => {
  return async (dispatch, getState) => {
    // 1. Update Redux ngay
    dispatch(addToCart(product));

    // 2. Lấy user đang login
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    // 3. Lấy cart hiện tại trong Redux
    const { items } = getState().cart;

    // 4. Gọi API để PATCH cart
    try {
      await fetch(`http://localhost:5000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: items }),
      });
    } catch (err) {
      console.error("❌ Lỗi update cart:", err);
    }
  };
};
export const removeFromCartAsync = (productId) => async (dispatch) => {
  const savedUser = localStorage.getItem("user");
  if (!savedUser) return;

  const user = JSON.parse(savedUser);

  try {
    // Lấy lại cart hiện tại
    const res = await fetch(`http://localhost:5000/users/${user.id}`);
    const userData = await res.json();

    // Xóa item có id trùng
    const updatedCart = userData.cart.filter((item) => item.id !== productId);

    // Gửi PATCH để lưu giỏ hàng mới
    const updateRes = await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: updatedCart }),
    });

    if (!updateRes.ok) throw new Error("Cập nhật giỏ hàng thất bại");

    // Cập nhật lại Redux store
    dispatch(setCart(updatedCart));
  } catch (err) {
    console.error("Lỗi khi xóa giỏ hàng:", err);
  }
};

export const updateQtyAsync = ({ id, type }) => {
    return async (dispatch, getState) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
  
      let updatedCart = getState().cart.items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            qty: type === "plus" ? item.qty + 1 : Math.max(1, item.qty - 1),
          };
        }
        return item;
      });
  
      try {
        await fetch(`http://localhost:5000/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: updatedCart }),
        });
  
        dispatch(setCart(updatedCart)); // ✅ nhớ import setCart từ cartSlice
      } catch (err) {
        console.error("❌ Lỗi khi update số lượng:", err);
      }
    };
  };
  