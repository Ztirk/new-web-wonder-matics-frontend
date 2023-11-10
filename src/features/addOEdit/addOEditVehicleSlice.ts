import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendVehicle } from "../../interface/vehicleType";

const initialState: SendVehicle = {
  vehicle: {
    vehicle_id: 0,
    driving_license_type_code_id: null,
    frame_no: "",
    license_plate: "",
    number_of_axles: 0,
    number_of_tires: 0,
    number_of_wheels: 0,
    registration_province_code_id: null,
    registration_type_code_id: null,
    vehicle_model_id: null,
    vehicle_type_code_id: null,
  },
};

const addOEditVehicleSlice = createSlice({
  name: "addOEditVehicle",
  initialState,
  reducers: {},
});

export const {} = addOEditVehicleSlice.actions;

export const addOEditVehicleState = (state) => state.addOEditVehicle;

export default addOEditVehicleSlice.reducer;
