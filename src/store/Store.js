import { configureStore } from "@reduxjs/toolkit";
import AuthReducers from "./authSlice"
import AnimationReducers from "./animationSlice"
const store =configureStore({
    reducer:{
auth : AuthReducers,
animation:AnimationReducers
    }
})
export default store 
