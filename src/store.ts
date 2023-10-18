import { configureStore } from "@reduxjs/toolkit";
import editedReducer from "./features/editedReducer";
import addNewReducer from "./features/addNewReducer";
import displayReducer from "./features/displayReducer";

export default configureStore({
  reducer: { edited: editedReducer, addNew: addNewReducer, display: displayReducer },
});
