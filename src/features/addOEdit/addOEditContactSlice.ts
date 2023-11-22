import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendContact } from "../../interface/contactType";

const initialState: SendContact = {
  contact: {
    contact_id: 0,
    contact_code_id: null,
    value: "",
    customer_id: 0,
    person_id: 0,
    owner_type_code_id: null,
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
    setContactCustomerId(state, action: PayloadAction<number>) {
      state.contact.customer_id = action.payload ? action.payload : null;
    },
    setContactPersonId(state, action: PayloadAction<number>) {
      state.contact.person_id = action.payload ? action.payload : null;
    },
    setOwnerTypeCodeId(state, action: PayloadAction<number>) {
      state.contact.owner_type_code_id = action.payload ? action.payload : null;
    },
    setDefaultContact(state) {
      state.contact = {
        contact_id: 0,
        contact_code_id: null,
        value: "",
        customer_id: null,
        owner_type_code_id: null,
        person_id: null,
      };
    },
  },
});

export const {
  setContactCodeId,
  setContactId,
  setValue,
  setDefaultContact,
  setContactCustomerId,
  setContactPersonId,
  setOwnerTypeCodeId,
} = addOEditContactSlice.actions;

export const addOEditContactState = (state) => state.addOEditContact;

export default addOEditContactSlice.reducer;
