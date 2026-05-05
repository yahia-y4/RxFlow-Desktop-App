import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Item } from "../types";
import { getAllItems } from "../StorageAPI/GetAllItemsAPI";

interface ItemState {
  itemsById: Record<string, Item>;
  itemsIDs: string[];
  codeToItemID: Record<string, string>;
  selectedItemID?: string;
}
const initialState: ItemState = {
  itemsById:{},
  itemsIDs: [],
  codeToItemID: {},
  selectedItemID: undefined,
};

export const fetchItems = createAsyncThunk<Item[]>("item/fetchItems", async () => {
 return await getAllItems() ;
});

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    selectIDitem: (state, action) => {
      state.selectedItemID = action.payload.id;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      const items = action.payload;
      for (const item of items) {
        state.itemsById[item.id] = item;
        state.itemsIDs.push(item.id);
        state.codeToItemID[item.code] = item.id;

     }
    
    });
  },
});

export const {selectIDitem} = itemSlice.actions
export default itemSlice.reducer;
