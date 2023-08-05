import { configureStore } from "@reduxjs/toolkit";
// import counterSlice from "./counterSlice";
import exampleReducer from "./slice/exampleSlice";
import userReducer from "./slice/userSlice";

const store = configureStore({
  reducer: {
    // counter: counterSlice.reducer,
    example: exampleReducer,
    user: userReducer,
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
