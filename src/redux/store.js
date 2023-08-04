import { configureStore } from "@reduxjs/toolkit";
// import counterSlice from "./counterSlice";
import exampleReducer from "./slice/exampleSlice";

const store = configureStore({
  reducer: {
    // counter: counterSlice.reducer,
    example: exampleReducer,
  },
});

export default store;

/**
src 
├── redux
     ├── store.js
     ├── slices
           └── exampleSlice.js
 */
