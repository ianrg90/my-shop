import { configureStore } from "@reduxjs/toolkit";
import damageSlice from "./damages-slice";
import quoteSlice from "./quote-slice";
import uiSlice from "./ui-slice";
import servicesSlice from "./services-slice";

const store = configureStore({
  reducer: {
    damageList: damageSlice,
    ui: uiSlice,
    quotes: quoteSlice,
    services: servicesSlice,
  },
});

export default store;
