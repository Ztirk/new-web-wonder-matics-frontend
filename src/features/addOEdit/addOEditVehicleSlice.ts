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
  reducers: {
    setVehicleId(state, actions: PayloadAction<number>) {
      state.vehicle.vehicle_id = actions.payload;
    },
    setDrivingLicenseTypeCodeId(state, actions: PayloadAction<number>) {
      state.vehicle.driving_license_type_code_id = actions.payload
        ? actions.payload
        : null;
    },
    setFrameNo(state, actions: PayloadAction<string>) {
      state.vehicle.frame_no = actions.payload;
    },
    setLicensePlate(state, actions: PayloadAction<string>) {
      state.vehicle.license_plate = actions.payload;
    },
    setNumberOfAxles(state, actions: PayloadAction<number>) {
      state.vehicle.number_of_axles = actions.payload;
    },
    setNumberOfTires(state, actions: PayloadAction<number>) {
      state.vehicle.number_of_tires = actions.payload;
    },
    setNumberOfWheels(state, actions: PayloadAction<number>) {
      state.vehicle.number_of_wheels = actions.payload;
    },
    setRegistrationProvinceCodeId(state, actions: PayloadAction<number>) {
      state.vehicle.registration_province_code_id = actions.payload;
    },
    setRegistrationTypeCodeId(state, actions: PayloadAction<number>) {
      state.vehicle.registration_type_code_id = actions.payload;
    },
    setVehicleModelId(state, actions: PayloadAction<number>) {
      state.vehicle.vehicle_model_id = actions.payload;
    },
    setVehicleTypeCodeId(state, actions: PayloadAction<number>) {
      state.vehicle.vehicle_type_code_id = actions.payload;
    },
    setDefaultVehicle(state) {
      state.vehicle = {
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
      };
    },
  },
});

export const {
  setDrivingLicenseTypeCodeId,
  setFrameNo,
  setLicensePlate,
  setNumberOfAxles,
  setNumberOfTires,
  setNumberOfWheels,
  setRegistrationProvinceCodeId,
  setRegistrationTypeCodeId,
  setVehicleId,
  setVehicleModelId,
  setVehicleTypeCodeId,
  setDefaultVehicle,
} = addOEditVehicleSlice.actions;

export const addOEditVehicleState = (state) => state.addOEditVehicle;

export default addOEditVehicleSlice.reducer;
