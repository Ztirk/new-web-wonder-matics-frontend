import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = new FormData();

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles(state, action: PayloadAction<FileList[0] | null>) {
      state.append("files", action.payload);
    },
  },
});

export const { setFiles } = filesSlice.actions;

export const filesState = (state) => state.files;

export default filesSlice.reducer;
