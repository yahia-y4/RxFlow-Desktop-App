import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Item } from "../types";
import { getAllItems } from "../StorageAPI/GetAllItemsAPI";

interface ItemState {
  items: Item[];
}
const initialState: ItemState = {
  items:[],
};

export const fetchItems = createAsyncThunk<Item[]>("item/fetchItems", async () => {
 return await getAllItems() ;
});

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchItems.fulfilled, (state, action) => {
    state.items = action.payload;
    
    });
  },
});

// export const {} = itemSlice.actions
export default itemSlice.reducer;
