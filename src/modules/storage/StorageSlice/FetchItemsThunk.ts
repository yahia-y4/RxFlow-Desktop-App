import {createAsyncThunk } from "@reduxjs/toolkit";
import { getAllItems } from "../StorageAPI/GetAllItemsAPI";
import { setError } from "../../../store/global/errorSlice.ts";
import { setLoading } from "../../../store/global/loadingSlice.ts";
import type { Item } from "../types";
export const fetchItems = createAsyncThunk<Item[]>(
  "item/fetchItems",
  async (_, { dispatch, rejectWithValue }) => {
    try {
        dispatch(setLoading(true))
      const res = await getAllItems();
      if (!res.success) {
        console.error("Error fetching items:", res.message);
        dispatch(setError(res.message || "Failed to fetch items"));
        return rejectWithValue(res.message);
      } else {
        return res.data || [];
      }
    } catch (error) {
      console.error("Error fetching items:", error);

      return rejectWithValue("Failed to fetch items");
    }finally{
        dispatch(setLoading(false))
    }
  },
);