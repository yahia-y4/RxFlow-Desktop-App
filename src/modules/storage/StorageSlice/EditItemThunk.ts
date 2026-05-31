import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "../../../store/global/errorSlice.ts";
import { setLoading } from "../../../store/global/loadingSlice.ts";
import { hideWarning } from "../../../store/global/WarningSlice.ts"; 
import { editItem } from "../StorageAPI/EditItemAPI.ts";
import type { Item, ItemForm } from "../types";
export const EditItemT = createAsyncThunk<Item , {id:string | number , itemInfo: Partial<ItemForm>}>(
    "item/EditItem", async({id, itemInfo}, {dispatch, rejectWithValue})=>{
        try {
            dispatch(setLoading(true))
            const res = await editItem(id, itemInfo);
            if (!res.success) {
                dispatch(setError(res.message));
                return rejectWithValue(res.message);
              }
                
                return res.data as Item;
        } catch {
            dispatch(setError("error"));
            return rejectWithValue("error");
        }finally{
            
            dispatch(hideWarning())
        }
    });
   





