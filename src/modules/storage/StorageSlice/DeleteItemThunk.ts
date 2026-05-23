
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteItem } from "../StorageAPI/DeleteItemAPI";
import { setError } from "../../../store/global/errorSlice.ts";
import { setLoading } from "../../../store/global/loadingSlice.ts";
import { hideWarning } from "../../../store/global/WarningSlice.ts"; 
import type { Item } from "../types";
export const DeleteItem = createAsyncThunk<Item , string >(
  "item/DeleteItem",
  async (itemID, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const res = await deleteItem(itemID);
      console.log("Delete item response in thunk:", res);
        if (!res.success) {
            dispatch(setError(res.message));
            return rejectWithValue(res.message);
          } 
          console.log("Deleted item data in thunk:", res.data);
        return res.data as Item;
    } catch {
      dispatch(setError("error"));
      return rejectWithValue("error");
    }finally{
      dispatch(setLoading(false))
        dispatch(hideWarning())
    }
    }
);