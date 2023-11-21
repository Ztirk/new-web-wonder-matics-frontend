import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToggleProps } from "../interface/componentType";

const initialState: ToggleProps = {
  active: false,
  name: "",
  title: "",
  id: 0,
  type: "",
};

const togglePropsPopUpSlice = createSlice({
  name: "togglePropsPopUp",
  initialState,
  reducers: {
    setTogglePropsState(state, action: PayloadAction<ToggleProps>) {
      state.active = action.payload.active;
      state.name = action.payload.name;
      state.title = action.payload.title;
      state.id = action.payload.id;
      state.type = action.payload.type;
    },

    setTogglePropsDefault(state) {
      state.active = false;
      state.id = 0;
      state.name = "";
      state.title = "";
      state.type = "";
    },
  },
});

export const { setTogglePropsState, setTogglePropsDefault } =
  togglePropsPopUpSlice.actions;

export const togglePropsPopUpState = (state) => state.togglePropsPopUp;

export default togglePropsPopUpSlice.reducer;
