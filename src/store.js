import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import lostSlice from "./redux/lostSlice";
import addSlice from "./redux/addSlice";
const store=configureStore({
    reducer:{
        user:authSlice,
        lost:lostSlice,
        add:addSlice,
    }
})
export default store