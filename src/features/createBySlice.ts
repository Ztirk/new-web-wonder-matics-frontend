import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DisplayData } from "../interface/reduxType";

const initialState: DisplayData = {
  create_by: 0,
};

const createBySlice = createSlice({
  name: "createBy",
  initialState,
  reducers: {},
});

export const {} = createBySlice.actions;

export const createByState = (state) => state.display;

export default createBySlice.reducer;
