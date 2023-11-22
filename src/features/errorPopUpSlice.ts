import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorPopUpType } from "../interface/componentType";

const initialState: ErrorPopUpType = {
  active: false,
  message: "",
};

const errorPopUpSlice = createSlice({
  name: "errorPopUp",
  initialState,
  reducers: {
    setErrorPopUpState(state, action: PayloadAction<ErrorPopUpType>) {
      state.active = action.payload.active;
      state.message = action.payload.message;
    },
  },
});

export const { setErrorPopUpState } = errorPopUpSlice.actions;

export const errorPopUpState = (state) => state.errorPopUp;

export default errorPopUpSlice.reducer;
