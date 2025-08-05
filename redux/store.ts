import { configureStore } from "@reduxjs/toolkit";
import { newsApi } from "./services/newsApi";
import { guardianApi } from "./services/guardianApi";

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [guardianApi.reducerPath]: guardianApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(newsApi.middleware)
      .concat(guardianApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
