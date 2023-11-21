import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionBy } from "../interface/reduxType";

const initialState: ActionBy = {
  action_by: 0,
};

const actionBySlice = createSlice({
  name: "actionBy",
  initialState,
  reducers: {},
});

export const {} = actionBySlice.actions;

export const actionByState = (state) => state.actionBy;

export default actionBySlice.reducer;
