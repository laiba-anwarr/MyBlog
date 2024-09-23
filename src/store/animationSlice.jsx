import { createSlice } from "@reduxjs/toolkit";

const animationSlice = createSlice({
    name:"animation",
    initialState:{
        animationComplete :false
    },
    reducers:{
        setAnimationComplete : (state , action)=>{
state.animationComplete=action.payload
        }
    }
})
export const {setAnimationComplete}=animationSlice.actions;
export default animationSlice.reducer;