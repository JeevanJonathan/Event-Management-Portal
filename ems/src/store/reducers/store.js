import { configureStore } from "@reduxjs/toolkit";
import { vendorReducer } from "./vendorReducer";
import { errorReducer } from "./errorReducer";
import { bookingReducer } from "./bookingReducer";
import { authReducer } from "./authReducer";

const bookingItems = localStorage.getItem("bookingItems")
  ? JSON.parse(localStorage.getItem("bookingItems"))
  : [];

const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const initialState = {
  auth: { user: user },
  bookings: { booking: bookingItems },
};

export const store = configureStore({
  reducer: {
    vendors: vendorReducer,
    errors: errorReducer,
    bookings: bookingReducer,
    auth: authReducer,
  },
  preloadedState: initialState,
});

export default store;
