import { ApiStatus } from "./apiStatus";

export interface SendDeviceSerial {
  deviceSerial: {
    device_serial_id: number | string;
    serial_id: string;
    imei_serial: string;
    dvr_id: string;
    device_type_code_id: number | null;
  };
}

export interface DeviceSerial extends ApiStatus {
  response: {
    deviceSerial:
      | {
          RowNum: number;
          device_serial_id: number;
          serial_id: string;
          device_type: string;
          create_date: string;
        }[]
      | [];
    count_data: number;
  };
}

export interface IndividualDeviceSerial extends ApiStatus {
  response: {
    deviceSerial: {
      device_serial_id: number;
      serial_id: number;
      imei_serial: number;
      box_type: string;
      create_date: string;
    };
  };
}
