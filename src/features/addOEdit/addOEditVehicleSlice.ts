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
    brand_name: "",
    model_name: "",
  },
  vehicleConfig: {
    cc: 0,
    fuel_status: 0,
    idle_time: 0,
    kilo_rate: 0,
    max_empty_voltage: 0,
    max_empty_voltage_2: 0,
    max_empty_voltage_3: 0,
    max_fuel: 0,
    max_fuel_2: 0,
    max_fuel_3: 0,
    max_fuel_voltage: 0,
    max_fuel_voltage_2: 0,
    max_fuel_voltage_3: 0,
    max_speed: 0,
    oil_lite: 0,
    type: 0,
  },
  vehiclePermit: {
    diw: false,
    dlt: false,
    scgl: false,
    tls: false,
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
    setBrandName(state, action: PayloadAction<string>) {
      state.vehicle.brand_name = action.payload;
    },
    setModelName(state, action: PayloadAction<string>) {
      state.vehicle.model_name = action.payload;
    },
    setCc(state, action: PayloadAction<number>) {
      state.vehicleConfig.cc = action.payload;
    },
    setFuelStatus(state, action: PayloadAction<number>) {
      state.vehicleConfig.fuel_status = action.payload;
    },
    setIdleTime(state, action: PayloadAction<number>) {
      state.vehicleConfig.idle_time = action.payload;
    },
    setKiloRate(state, action: PayloadAction<number>) {
      state.vehicleConfig.idle_time = action.payload;
    },
    setMaxEmptyVoltage(state, action: PayloadAction<number>) {
      state.vehicleConfig.max_empty_voltage = action.payload;
    },
    setMaxEmptyVoltage2(state, action: PayloadAction<number>) {
      state.vehicleConfig.max_empty_voltage_2 = action.payload;
    },
    setMaxEmptyVoltage3(state, action: PayloadAction<number>) {
      state.vehicleConfig.max_empty_voltage_3 = action.payload;
    },
    setMaxFuel(state, action: PayloadAction<number>) {
      state.vehicleConfig.max_fuel = action.payload;
    },
    setMaxFuel2(state, action: PayloadAction<number>) {
      state.vehicleConfig.max_fuel_2 = action.payload;
    },
    setMaxFuel3(state, action: PayloadAction<number>) {
      state.vehicleConfig.max_fuel_3 = action.payload;
    },
    setMaxFuelVoltage(state, action: PayloadAction<number>) {
      state.vehicleConfig.max_fuel_voltage = action.payload;
    },
    setMaxFuelVoltage2(state, aciton: PayloadAction<number>) {
      state.vehicleConfig.max_fuel_voltage_2 = action.payload;
    },
    setMaxFuelVoltage3(state, action: PayloadAction<number>) {
      state.vehicleConfig.max_fuel_voltage_3 = action.payload;
    },
    setMaxSpeed(state, action: PayloadAction<number>) {
      state.vehicleConfig.max_speed = action.payload;
    },
    setOilLite(state, action: PayloadAction<number>) {
      state.vehicleConfig.oil_lite = action.payload;
    },
    setType(state, action: PayloadAction<number>) {
      state.vehicleConfig.type = action.payload;
    },
    setDIW(state, action: PayloadAction<boolean>) {
      state.vehiclePermit.diw = action.payload;
    },
    setDLT(state, action: PayloadAction<boolean>) {
      state.vehiclePermit.dlt = action.payload;
    },
    setSCGL(state, action: PayloadAction<boolean>) {
      state.vehiclePermit.scgl = action.payload;
    },
    setTLS(state, action: PayloadAction<boolean>) {
      state.vehiclePermit.tls = action.payload;
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
        brand_name: "",
        model_name: "",
      };
      state.vehicleConfig = {
        cc: 0,
        fuel_status: 0,
        idle_time: 0,
        kilo_rate: 0,
        max_empty_voltage: 0,
        max_empty_voltage_2: 0,
        max_empty_voltage_3: 0,
        max_fuel: 0,
        max_fuel_2: 0,
        max_fuel_3: 0,
        max_fuel_voltage: 0,
        max_fuel_voltage_2: 0,
        max_fuel_voltage_3: 0,
        max_speed: 0,
        oil_lite: 0,
        type: 0,
      };
      state.vehiclePermit = {
        diw: false,
        dlt: false,
        scgl: false,
        tls: false,
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
  setBrandName,
  setModelName,
  setCc,
  setDIW,
  setDLT,
  setFuelStatus,
  setIdleTime,
  setKiloRate,
  setMaxEmptyVoltage,
  setMaxEmptyVoltage2,
  setMaxEmptyVoltage3,
  setMaxFuel,
  setMaxFuel2,
  setMaxFuel3,
  setMaxFuelVoltage,
  setMaxFuelVoltage2,
  setMaxFuelVoltage3,
  setMaxSpeed,
  setOilLite,
  setSCGL,
  setTLS,
  setType,
} = addOEditVehicleSlice.actions;

export const addOEditVehicleState = (state) => state.addOEditVehicle;

export default addOEditVehicleSlice.reducer;
