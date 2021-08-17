import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import tokenReducer from "./tokenSlice";
import userReducer from "./userSlice";
import productFilterReducer from "./productSlice";
import cartReducer from "./cartSlice";
import historyReducer from "./historySlice";
import categoryReducer from "./categorySlice";
import usersAdminReducer from "./userSlice.admin";
import paymentReducer from "./paymentSlice";
import dashboardReducer from "./dashBoardSlice";
import pendingQuestionProductReducer from "./pendingQuestionProductSlice";

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  carts: cartReducer,
  histories: historyReducer,
  categories: categoryReducer,
  productsFilter: productFilterReducer,
  usersAdmin: usersAdminReducer,
  payments: paymentReducer,
  dashboards: dashboardReducer,
  // socket: socketReducer,
  pendingQuestionProducts: pendingQuestionProductReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["histories"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
