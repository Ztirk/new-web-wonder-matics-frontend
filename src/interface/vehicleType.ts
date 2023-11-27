import { ApiStatus } from "./apiStatus";

export interface VehicleSelector extends ApiStatus {
  response: { vehicles: { vehicle_id: number; license_plate: string }[] };
}

export interface BrandSelector extends ApiStatus {
  response: {
    brands: { brand: string }[];
  };
}

export interface ModelSelector extends ApiStatus {
  response: {
    models: { vehicle_model_id: number; model: string }[];
  };
}
export interface SendVehicle {
  vehicle: {
    vehicle_id: number | string;
    frame_no: string;
    license_plate: string;
    vehicle_model_id: number | null;
    registration_province_code_id: number | null;
    registration_type_code_id: number | null;
    driving_license_type_code_id: number | null;
    number_of_axles: number;
    number_of_wheels: number;
    number_of_tires: number;
    vehicle_type_code_id: number | null;
    brand_name: string;
    model_name: string;
  };
  vehicleConfig: {
    oil_lite: number;
    kilo_rate: number;
    max_speed: number;
    idle_time: number;
    cc: number;
    type: number;
    max_fuel_voltage: number;
    max_fuel_voltage_2: number;
    max_fuel_voltage_3: number;
    max_fuel: number;
    max_fuel_2: number;
    max_fuel_3: number;
    max_empty_voltage: number;
    max_empty_voltage_2: number;
    max_empty_voltage_3: number;
    fuel_status: boolean;
  };
  vehiclePermit: {
    dlt: boolean;
    tls: boolean;
    scgl: boolean;
    diw: boolean;
  };
}
export interface Vehicle extends ApiStatus {
  response: {
    vehicle:
      | {
          RowNum: number | null;
          vehicle_id: number;
          license_plate: string;
          frame_no: string;
          vehicle_type: string;
          model_type: string;
        }[]
      | [];
    count_data: number;
  };
}

export interface IndividualVehicle extends ApiStatus {
  response: {
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
      brand_name: string;
      model_name: string;
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
      fuel_status: boolean;
    };
    vehiclePermit: {
      dlt: boolean;
      tls: boolean;
      scgl: boolean;
      diw: boolean;
    };
  };
}
