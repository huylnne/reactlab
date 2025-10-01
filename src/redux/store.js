
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import cartReducer from "./cartSlice";
import { authReducer } from "./reducers/authReducer";


import { createEpicMiddleware, combineEpics } from "redux-observable";
import { loginEpic } from "./epics/authEpic";
import { cartEpics } from "./epics/cartEpic"; 


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], 
};


const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});


const rootEpic = combineEpics(
  loginEpic,
  ...cartEpics 
);


const epicMiddleware = createEpicMiddleware();


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, //Vi da dung epic
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
    }).concat(epicMiddleware),
});


epicMiddleware.run(rootEpic);


export const persistor = persistStore(store);