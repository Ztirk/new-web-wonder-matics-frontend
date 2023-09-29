import { configureStore } from "@reduxjs/toolkit";
import editedReducer from "./features/editedReducer";
import addNewReducer from "./features/addNewReducer";

export default configureStore({
  reducer: { edited: editedReducer, addNew: addNewReducer },
});
