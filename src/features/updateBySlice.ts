import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update_by: 0,
};

const updateBySlice = createSlice({
  name: "updateBy",
  initialState,
  reducers: {},
});

export const {} = updateBySlice.actions;

export const updateByState = (state) => state.updateBy;

export default updateBySlice.reducer;
