
import { configureStore } from '@reduxjs/toolkit'
import itemReducer from '../modules/storage/StorageSlice/ItemSlice.ts'
import errorReducer from './global/errorSlice.ts'
import loadingRaducer from './global/loadingSlice.ts'
import warningReducer from './global/WarningSlice.ts'

export const store = configureStore({
  reducer: {
    item: itemReducer,
    error: errorReducer,
    loading:loadingRaducer,
    warning: warningReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

