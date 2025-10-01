import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import cartReducer from "./cartSlice";


import { authReducer } from "./reducers/authReducer";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { loginEpic } from "./epics/authEpic";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // ✅ chỉ định reducer nào cần persist
};


const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer, 
});


const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics(loginEpic);

// persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // ⚠️ tắt thunk vì mình xài epic
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(epicMiddleware), // ✅ thêm epicMiddleware
});

// chạy root epic
epicMiddleware.run(rootEpic);

// ✅ PersistGate sẽ dùng thằng này
export const persistor = persistStore(store);
