import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface loadingState{
isLoading:boolean
}

const initialState : loadingState ={
    isLoading : false
}

export const loadingSlice = createSlice({
    name:"loading",
    initialState,
    reducers:{
        setLoading:(state, action: PayloadAction<boolean>)=>{
            state.isLoading = action.payload
        }
    }


});

export default loadingSlice.reducer
export const {setLoading} = loadingSlice.actions