import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update_by: 0,
};

const updateBySlice = createSlice({
  name: "createBy",
  initialState,
  reducers: {},
});

export const {} = updateBySlice.actions;

export const updateByState = (state) => state.display;

export default updateBySlice.reducer;
