
import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../modules/storage/StorageSlice/ItemSlice.ts'
import errorReducer from './global/errorSlice.ts'
import loadingRaducer from './global/loadingSlice.ts'

export const store = configureStore({
  reducer: {
    item: itemReducer,
    error: errorReducer,
    loading:loadingRaducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

