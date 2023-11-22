import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FormData = new FormData();

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addNewFile(state, action: PayloadAction<File>) {
      state.append("files", action.payload);
    },
    // removeFile(state, action: PayloadAction<FormData>) {
    //   state = action.payload;
    // },
  },
});

export const { addNewFile } = filesSlice.actions;

export const filesState = (state) => state.files;

export default filesSlice.reducer;
