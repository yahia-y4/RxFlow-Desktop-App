
import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../modules/storage/StorageSlice/ItemSlice.ts'
import errorReducer from './global/errorSlice.ts'

export const store = configureStore({
  reducer: {
    item: itemReducer,
    error: errorReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

