import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendPerson } from "../interface/personType";

const initialState: SendPerson = {
  person: {
    firstname: "",
    lastname: "",
    nickname: "",
    title_code_id: 0,
    description: "",
    roleDelete: [],
    role: [],
  },
};

const addOEditPersonSlice = createSlice({
  name: "addOEditPerson",
  initialState,
  reducers: {
    setFirstNameFetch(state, action: PayloadAction<string>) {
      if (!state.person.firstname) {
        state.person.firstname = action.payload;
      }
    },
    setFirstNameInteract(state, action: PayloadAction<string>) {
      state.person.firstname = action.payload;
    },
    setLastNameFetch(state, action: PayloadAction<string>) {
      if (!state.person.lastname) {
        state.person.lastname = action.payload;
      }
    },
    setLastNameInteract(state, action: PayloadAction<string>) {
      state.person.lastname = action.payload;
    },
    setNickNameFetch(state, action: PayloadAction<string>) {
      if (!state.person.nickname) {
        state.person.nickname = action.payload;
      }
    },
    setNickNameInteract(state, action: PayloadAction<string>) {
      state.person.nickname = action.payload;
    },
    setTitleCodeIdFetch(state, action: PayloadAction<number>) {
      if (!state.person.title_code_id) {
        state.person.title_code_id = action.payload;
      }
    },
    setTitleCodeIdInteract(state, action: PayloadAction<number>) {
      state.person.title_code_id = action.payload;
    },
    setDescriptionFetch(state, action: PayloadAction<string>) {
      if (!state.person.description) {
        state.person.description = action.payload;
      }
    },
    setDescriptionInteract(state, action: PayloadAction<string>) {
      state.person.description = action.payload;
    },

    setRoleDelete(state, action: PayloadAction<number>) {
      state.person.roleDelete.push(action.payload);
    },
    setRole(state, action: PayloadAction<number>) {
      state.person.role.push(action.payload);
    },
  },
});

export const {} = addOEditPersonSlice.actions;

export const addOEditPersonState = (state) => state.addOEditPerson;

export default addOEditPersonSlice.reducer;
