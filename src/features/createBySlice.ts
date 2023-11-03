import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  create_by: 0,
};

const createBySlice = createSlice({
  name: "createBy",
  initialState,
  reducers: {},
});

export const {} = createBySlice.actions;

export const createByState = (state) => state.createBy;

export default createBySlice.reducer;
