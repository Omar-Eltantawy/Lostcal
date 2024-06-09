import { configureStore  } from "@reduxjs/toolkit";
import authSlice from "./redux/authSlice";
import lostSlice from "./redux/lostSlice";
import addSlice from "./redux/addSlice";
import patchSlice from "./redux/patchSlice";
import forgetSlice from "./redux/forgetSlice";
import matchesSlice from "./redux/matchesSlice";
const store=configureStore({
    reducer:{
        user:authSlice,
        lost:lostSlice,
        add:addSlice,
        patch:patchSlice,
        forget:forgetSlice,
        matches:matchesSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
        // Specify additional middleware options here
        serializableCheck: false, // Disable serializable check if needed
        immutableCheck: false, // Disable immutable state invariant check if needed
        });
    },
})
export default store