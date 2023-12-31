import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slice/chatSlice";
import userReducer from "./slice/userSlice";

const store = configureStore({
  reducer: {
    // counter: counterSlice.reducer,
    chat: chatReducer,
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
