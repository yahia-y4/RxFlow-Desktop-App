import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import type { Item } from '../types'


interface ItemState {
    items: Record<string, Item>;
    ids: string[];
    itemSelectedId: string | null;


}

const initialState: ItemState = {
    items: {},
    itemSelectedId: "-1",
    ids: []

}

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        getItems: () => {
           async function fetchItems() {
            console.log("fetching items...")
           }
              fetchItems()

        },
    }
})

export const {getItems} = itemSlice.actions
export default itemSlice.reducer
