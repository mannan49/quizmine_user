import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import subjectReducer from "./subjectSlice"; // Import your Redux slice(s)
import thunkMiddleware from "redux-thunk"; // Import Redux Thunk

const store = configureStore({
  reducer: {
    subject: subjectReducer,
    // ... other reducers
  },
  middleware: [...getDefaultMiddleware(), thunkMiddleware], // Add Redux Thunk middleware
});

export default store;
