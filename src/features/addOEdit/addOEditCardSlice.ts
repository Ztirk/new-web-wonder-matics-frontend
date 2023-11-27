import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendCard } from "../../interface/cardType";

const initialState: SendCard = {
  card: {
    card_id: 0,
    card_code_id: null,
    person_id: 0,
    value: "",
    owner_type_code_id: null,
  },
};

const addOEditCardSlice = createSlice({
  name: "addOEditCard",
  initialState,
  reducers: {
    setCardId(state, action: PayloadAction<number | string>) {
      state.card.card_id = action.payload;
    },
    setCardCodeId(state, action: PayloadAction<number>) {
      state.card.card_code_id = action.payload ? action.payload : null;
    },
    setCardPersonId(state, action: PayloadAction<number>) {
      state.card.person_id = action.payload;
    },
    setCardValue(state, action: PayloadAction<string>) {
      state.card.value = action.payload;
    },
    setCardOwnerTypeCodeId(state, action: PayloadAction<number>) {
      state.card.owner_type_code_id = action.payload ? action.payload : null;
    },
    setDefaultCard(state) {
      state.card = {
        card_id: 0,
        card_code_id: null,
        person_id: 0,
        value: "",
        owner_type_code_id: null,
      };
    },
  },
});

export const {
  setCardCodeId,
  setCardId,
  setCardPersonId,
  setCardValue,
  setDefaultCard,
  setCardOwnerTypeCodeId,
} = addOEditCardSlice.actions;

export const addOEditCardState = (state) => state.addOEditCard;

export default addOEditCardSlice.reducer;
