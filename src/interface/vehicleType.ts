import { ApiStatus } from "./apiStatus";

export interface VehicleShape {
  vehicle: [VehicleIterate] | [];
}

export interface VehicleIterate {
  RowNum: number;
  vehicle_id: number;
  license_plate: string;
  frame_no: string;
  vehicle_type: string;
  model_type: string;
}

export interface Vehicle extends ApiStatus {
  response: {
    vehicle: VehicleShape;
  };
}

export interface IndividualVehicle extends ApiStatus {
  response:
    | {
        vehicle: {
          vehicle_id: number;
          frame_no: string;
          license_plate: string;
          vehicle_model_id: number;
          registration_province_code_id: number;
          registration_type_code_id: number;
          driving_license_type_code_id: number;
          number_of_axles: number;
          number_of_wheels: number;
          number_of_tires: number;
          vehicle_type_code_id: number;
        };
        vehicleConfig: {
          vehicle_config_id: number;
          vehicle_id: number;
          oil_lite: number;
          kilo_rate: number;
          max_speed: number;
          idle_time: number;
          cc: number;
          type: number;
          max_fuel_voltage: number;
          max_fuel_voltage_2: number;
          max_fuel_voltage_3: number;
          ma_fuel: number;
          max_fuel_2: number;
          max_fuel_3: number;
          max_empty_voltage: number;
          max_empty_voltage_2: number;
          max_empty_voltage_3: number;
          fuel_status: number;
        };
      }
    | Vehicle;
}
