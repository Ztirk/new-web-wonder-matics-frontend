import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorPopUp } from "../interface/componentType";

const initialState: ErrorPopUp = {
  active: false,
  message: "",
};

const errorPopUpSlice = createSlice({
  name: "errorPopUp",
  initialState,
  reducers: {
    setErrorPopUpState(state, action: PayloadAction<ErrorPopUp>) {
      state.active = action.payload.active;
      state.message = action.payload.message;
    },
  },
});

export const { setErrorPopUpState } = errorPopUpSlice.actions;

export const errorPopUpState = (state) => state.errorPopUp;

export default errorPopUpSlice.reducer;
