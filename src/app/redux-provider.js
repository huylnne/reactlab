"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store,persistor } from "../redux/store"; // 👈 chú ý import có ngoặc nhọn

export default function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      );
}

