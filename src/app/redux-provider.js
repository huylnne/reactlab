"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store"; // 👈 chú ý import có ngoặc nhọn

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

