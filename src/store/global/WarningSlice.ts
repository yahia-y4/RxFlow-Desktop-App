import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface WarningState {
  message: string;
  isVisible: boolean;
  toExecute: () => void;
}
const initialState: WarningState = {
  message: "",
  isVisible: false,
  toExecute: () => {},
};

export const WarningSlice = createSlice({
  name: "warning",
  initialState,
  reducers: {
    showWarning: (
      state,
      action: PayloadAction<{ message: string; toExecute: () => void }>,
    ) => {
      state.message = action.payload.message;
      state.toExecute = action.payload.toExecute;
      state.isVisible = true;
    },
    hideWarning: (state) => {
      state.isVisible = false;
      state.message = "";
      state.toExecute = () => {};
    },
  },
});
export const { showWarning, hideWarning } = WarningSlice.actions;
export default WarningSlice.reducer;
