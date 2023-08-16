import { configureStore } from "@reduxjs/toolkit";
import subjectReducer from "./subjectSlice";
import thunkMiddleware from "redux-thunk";
import showMcqSliceReducer from "./showMcqSlice";

const store = configureStore({
  reducer: {
    subject: subjectReducer,
    mcq: showMcqSliceReducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

export default store;
