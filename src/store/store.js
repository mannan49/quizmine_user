import { configureStore } from "@reduxjs/toolkit";
import subjectReducer from "./subjectSlice";
import thunkMiddleware from "redux-thunk";
import showMcqSliceReducer from "./showMcqSlice";
import userSliceReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    subject: subjectReducer,
    mcq: showMcqSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

export default store;
