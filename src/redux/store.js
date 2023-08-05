import { configureStore } from "@reduxjs/toolkit";
// import exampleReducer from "./slice/exampleSlice";
import chatReducer from "./slice/chatSlice";
const store = configureStore({
  reducer: {
    // counter: counterSlice.reducer,
    chat: chatReducer,
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
