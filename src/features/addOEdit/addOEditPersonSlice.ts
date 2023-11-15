import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendPerson } from "../../interface/personType";

const initialState: SendPerson = {
  person: {
    person_id: 0,
    firstname: "",
    lastname: "",
    nickname: "",
    title_code_id: null,
    description: "",
    roleDelete: [],
    role: [],
    email: "",
    line: "",
    mobile: "",
  },
};

const addOEditPersonSlice = createSlice({
  name: "addOEditPerson",
  initialState,
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.person.firstname = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.person.lastname = action.payload;
    },
    setNickName(state, action: PayloadAction<string>) {
      state.person.nickname = action.payload;
    },
    setTitleCodeId(state, action: PayloadAction<number>) {
      state.person.title_code_id = action.payload ? action.payload : null;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.person.description = action.payload;
    },
    setRoleDelete(state, action: PayloadAction<number>) {
      state.person.roleDelete.push(action.payload);
    },
    removeRoleDelete(state, action: PayloadAction<number>) {
      state.person.roleDelete = state.person.roleDelete.filter(
        (id) => id !== action.payload
      );
    },
    setRole(state, action: PayloadAction<number>) {
      state.person.role.push(action.payload);
    },
    removeRole(state, action: PayloadAction<number>) {
      state.person.role = state.person.role.filter(
        (id) => id !== action.payload
      );
    },
    setEmail(state, action: PayloadAction<string>) {
      state.person.email = action.payload;
    },
    setMobile(state, action: PayloadAction<string>) {
      state.person.mobile = action.payload;
    },
    setLine(state, action: PayloadAction<string>) {
      state.person.line = action.payload;
    },
    setDefaultPerson(state) {
      state.person = {
        person_id: 0,
        firstname: "",
        lastname: "",
        nickname: "",
        title_code_id: null,
        description: "",
        roleDelete: [],
        role: [],
        email: "",
        line: "",
        mobile: "",
      };
    },
  },
});

export const {
  setDescription,
  setFirstName,
  setLastName,
  setNickName,
  setRole,
  setRoleDelete,
  setTitleCodeId,
  setEmail,
  setLine,
  setMobile,
  setDefaultPerson,
  removeRole,
  removeRoleDelete,
} = addOEditPersonSlice.actions;

export const addOEditPersonState = (state) => state.addOEditPerson;

export default addOEditPersonSlice.reducer;
