import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import roomReducer from "./roomRedux";
import screenReducer from "./screenRedux";
import themeReducer from "./themeRedux";

import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
  screen: screenReducer,
  theme: themeReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export let persistor = persistStore(store);
