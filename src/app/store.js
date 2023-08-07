import { configureStore } from "@reduxjs/toolkit";

import calendarSlice from "../features/calendarSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice,
  },
});
