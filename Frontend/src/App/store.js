
import contractsReducer from "./Feature/contractsSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    contracts: contractsReducer,
  },
});

export default store;
