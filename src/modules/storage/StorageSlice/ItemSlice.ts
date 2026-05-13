import { createSlice } from "@reduxjs/toolkit";
import type { Item } from "../types";
import { AddNewItem } from "./AddItemThunk.ts";
import { fetchItems } from "./FetchItemsThunk.ts";

interface ItemState {
  itemsArray: Item[];
  itemsById: Record<string, Item>;
  itemsIDs: string[];
  codeToItemID: Record<string, string>;
  selectedItemID?: string;
}
const initialState: ItemState = {
  itemsArray: [],
  itemsById: {},
  itemsIDs: [],
  codeToItemID: {},
  selectedItemID: undefined,
};



export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    selectIDitem: (state, action) => {
      state.selectedItemID = action.payload.id;
    },
  },
  extraReducers: (builder) => {
  builder
    .addCase(fetchItems.fulfilled, (state, action) => {
      state.itemsArray = action.payload;
      for (const item of state.itemsArray) {
        state.itemsById[item.id] = item;
        state.itemsIDs.push(item.id);
        state.codeToItemID[item.code] = item.id;
      }
    })
    .addCase(AddNewItem.fulfilled, (state, action) => {
      console.log(action.payload.id)
      state.itemsArray.push(action.payload)
      state.itemsById[action.payload.id]=action.payload
      state.itemsIDs.push(action.payload.id)
      state.codeToItemID[action.payload.code] = action.payload.id 
     
   
    });
},
});

export const { selectIDitem } = itemSlice.actions;
export default itemSlice.reducer;
