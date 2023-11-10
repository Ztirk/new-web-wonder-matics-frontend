import { ApiStatus } from "./apiStatus";
export interface SendDevice {
  device: {
    device_id: number;
    veh_id: number | null;
    device_serial_id: number;
  };
  deviceConfig: {
    config_name: string;
    software_version: string;
    ip_address: string;
    gateway_port: string;
    sms_server_number: string;
    sms_message_center: string;
    sim_serial: string;
    mobile_number: string;
    sim_type_code_id: number | null;
    network: string;
    username: string;
    password: string;
  };
}
export interface DeviceIterate {
  RowNum: number;
  device_id: number;
  veh_id: number;
  device_serial_id: number;
  box_type: string;
  sim_type: string;
}

export interface DeviceDisplay {
  device: DeviceIterate[] | [];
}

export interface StoringIndividualDevice {
  device_id: number;
  veh_id: number;
  create_date: string;
}

export interface StoringIndividualDeviceSerial {
  RowNum: number;
  device_serial_id: number;
  serial_id: string;
  device_type: string;
  create_date: string;
}

export interface StoringIndividualDeviceConfig {
  device_config_id: number;
  device_id: number;
  mobile_number: string;
  sim_serial: string;
  sim_type_code_id: number;
  sim_type: string;
  ip_address: string;
  software_version: string;
}
export interface Device extends ApiStatus {
  response: {
    device: DeviceIterate[] | [];
  };
}

export interface IndividualDevice extends ApiStatus {
  response: {
    device: StoringIndividualDevice;
    deviceSerial: StoringIndividualDeviceSerial;
    deviceConfig: StoringIndividualDeviceConfig;
  };
}
