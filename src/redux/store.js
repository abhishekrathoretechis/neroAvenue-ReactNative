import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import postSlice from "./reducers/postSlice";

const reducer = {
  auth: authSlice,
  post: postSlice
};

export default configureStore({
  reducer,
});