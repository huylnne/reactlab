const API_URL = "https://dummyjson.com/auth/login";

export const authService = {
  login: async ({ username, password }) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Đăng nhập thất bại");

    return await res.json(); 
  },
};
