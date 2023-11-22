import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendDocument } from "../../interface/documentType";

const initialState: SendDocument = {
  document: {
    document_id: 0,
    address_id: null,
    customer_id: null,
    document_code_id: null,
    document_name: "",
    person_id: null,
    vehicle_id: null,
    owner_type_code_id: null,
  },
};

const addOEditDocumentSlice = createSlice({
  name: "addOEditDocument",
  initialState,
  reducers: {
    setDocumentId(state, action: PayloadAction<number | string>) {
      state.document.document_id = action.payload;
    },
    setDocumentAddressId(state, action: PayloadAction<number>) {
      state.document.address_id = action.payload ? action.payload : null;
    },
    setDocumentCustomerId(state, action: PayloadAction<number>) {
      state.document.customer_id = action.payload ? action.payload : null;
    },
    setDocumentCodeId(state, action: PayloadAction<number>) {
      state.document.document_code_id = action.payload ? action.payload : null;
    },
    setDocumentName(state, action: PayloadAction<string>) {
      state.document.document_name = action.payload;
    },
    setDocumentPersonId(state, action: PayloadAction<number>) {
      state.document.person_id = action.payload ? action.payload : null;
    },
    setDocumentVehicleId(state, action: PayloadAction<number>) {
      state.document.vehicle_id = action.payload ? action.payload : null;
    },
    setDocumentOwnerTypeCodeId(state, action: PayloadAction<number>) {
      state.document.owner_type_code_id = action.payload
        ? action.payload
        : null;
    },

    setDefaultDocument(state) {
      state.document = {
        document_id: 0,
        address_id: null,
        customer_id: null,
        document_code_id: null,
        document_name: "",
        person_id: null,
        vehicle_id: null,
        owner_type_code_id: null,
      };
    },
  },
});

export const {
  setDocumentCustomerId,
  setDefaultDocument,
  setDocumentAddressId,
  setDocumentCodeId,
  setDocumentId,
  setDocumentName,
  setDocumentPersonId,
  setDocumentVehicleId,
  setDocumentOwnerTypeCodeId,
} = addOEditDocumentSlice.actions;

export const addOEditDocumentState = (state) => state.addOEditDocument;

export default addOEditDocumentSlice.reducer;
