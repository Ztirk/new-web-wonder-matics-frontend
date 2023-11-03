import { ApiStatus } from "./apiStatus";

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

export interface Device extends ApiStatus {
  response: {
    device: DeviceIterate[] | [];
  };
}

export interface IndividualDevice extends ApiStatus {
  response:
    | {
        device: {
          device_id: number;
          veh_id: number;
          create_date: string;
        };
        deviceSerial: [
          {
            RowNum: number;
            device_serial_id: number;
            serial_id: string;
            device_type: string;
            create_date: string;
          }
        ];
        deviceConfig: [
          {
            device_config_id: number;
            device_id: number;
            mobile_number: string;
            sim_serial: string;
            sim_type_code_id: number;
            sim_type: string;
            ip_address: string;
            software_version: string;
          }
        ];
      }
    | Device;
}
