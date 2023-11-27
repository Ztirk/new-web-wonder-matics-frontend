import { ApiStatus } from "./apiStatus";
export interface SendDevice {
  device: {
    device_id: number;
    veh_id: number | null;
    device_serial_id: number;
    create_date: string;
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
export interface Device extends ApiStatus {
  response: {
    device:
      | {
          RowNum: number;
          device_id: number;
          veh_id: number;
          device_serial_id: number;
          serial_id: string;
          box_type: string;
          sim_type: string;
        }[]
      | [];
    count_data: number;
  };
}

export interface IndividualDevice extends ApiStatus {
  response: {
    device: {
      device_id: number;
      veh_id: number;
      device_serial_id: number;
      serial_id: string;
      create_date: string;
    };
    deviceConfig: {
      device_config_id: number;
      device_id: number;
      config_name: string;
      software_version: string;
      ip_address: string;
      gateway_port: string;
      sms_server_number: string;
      sms_message_center: string;
      sim_serial: string;
      mobile_number: string;
      sim_type_code_id: number;
      sim_type: string;
      network: string;
      username: string;
      password: string;
    };
  };
}
