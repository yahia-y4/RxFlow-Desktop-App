import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNewItem } from "../StorageAPI/AddNewItemAPI";
import { setError } from "../../../store/global/errorSlice.ts";
import { setLoading } from "../../../store/global/loadingSlice.ts";
import type { Item, ItemForm } from "../types";

export const AddNewItem = createAsyncThunk<Item, Partial<ItemForm>>(
  "item/AddNewItem",
  async (itemInfo, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const res = await addNewItem(itemInfo);
      if (!res.success) {
        dispatch(setError(res.message));
        return rejectWithValue(res.message); 
      }
      console.log(res.data)
      return res.data as Item;
    } catch {
      dispatch(setError("error"));
      return rejectWithValue("error");
    }finally{
      dispatch(setLoading(false))
    }
  }
);