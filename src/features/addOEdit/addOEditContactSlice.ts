import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendContact } from "../../interface/contactType";

const initialState: SendContact = {
  contact: {
    contact_id: 0,
    contact_code_id: null,
    value: "",
  },
};

const addOEditContactSlice = createSlice({
  name: "addOEditContact",
  initialState,
  reducers: {
    setContactId(state, action: PayloadAction<number | string>) {
      state.contact.contact_id = action.payload;
    },
    setContactCodeId(state, action: PayloadAction<number | null>) {
      state.contact.contact_code_id = action.payload ? action.payload : null;
    },
    setValue(state, action: PayloadAction<string>) {
      state.contact.value = action.payload;
    },
  },
});

export const { setContactCodeId, setContactId, setValue } =
  addOEditContactSlice.actions;

export const addOEditContactState = (state) => state.addOEditContact;

export default addOEditContactSlice.reducer;
