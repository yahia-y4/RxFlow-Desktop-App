import { createSlice } from "@reduxjs/toolkit";
import type { Item } from "../types";
import { AddNewItem } from "./AddItemThunk.ts";
import { fetchItems } from "./FetchItemsThunk.ts";
import { DeleteItem } from "./DeleteItemThunk.ts";
import { EditItemT } from "./EditItemThunk.ts";

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
    builder.addCase(DeleteItem.fulfilled, (state, action) => {
      const deletedItemID = action.payload.id;
      console.log("deleted item id in slice:", deletedItemID);
      state.itemsArray = state.itemsArray.filter(item => item.id !== deletedItemID);
      delete state.itemsById[deletedItemID];
      state.itemsIDs = state.itemsIDs.filter(id => id !== deletedItemID);
      const deletedItemCode = action.payload.code;
      delete state.codeToItemID[deletedItemCode];
    });
    builder.addCase(EditItemT.fulfilled, (state, action) => {
      const editedItem = action.payload;
      const itemID = editedItem.id;
      state.itemsById[itemID] = editedItem;
      const index = state.itemsArray.findIndex(item => item.id === itemID);
      if (index !== -1) {
        state.itemsArray[index] = editedItem;
      }
        state.codeToItemID[editedItem.code] = itemID;
        

    });
    
},
});

export const { selectIDitem } = itemSlice.actions;
export default itemSlice.reducer;
