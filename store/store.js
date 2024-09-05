import { configureStore } from "@reduxjs/toolkit";
import likeSlice from "./likeSlice";
import detailSlice from "./detailSlice";
// import productSlice from "./productSlice";

const store  =configureStore({
    reducer:{
        like:likeSlice,
        detail:detailSlice,
        // product:productSlice,
    }
});
export default store;