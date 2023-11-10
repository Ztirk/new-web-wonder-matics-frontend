import { ApiStatus } from "./apiStatus";

export interface SendDeviceSerial {
  deviceSerial: {
    device_serial_id: number;
    imei_serial: string;
    dvr_id: string;
    device_type_code_id: number | null;
  };
}

export interface DeviceSerialIterate {
  RowNum: number;
  device_serial_id: number;
  serial_id: string;
  device_type: string;
  create_date: string;
}

export interface StoringIndividualDeviceSerial {
  device_serial_id: number;
  serial_id: number;
  imei_serial: number;
  box_type: string;
  create_date: string;
}

export interface DeviceSerialDisplay {
  deviceSerial: DeviceSerialIterate[] | [];
}

export interface DeviceSerial extends ApiStatus {
  response: {
    deviceSerial: DeviceSerialIterate[] | [];
  };
}

export interface IndividualDeviceSerial extends ApiStatus {
  response: {
    deviceSerial: StoringIndividualDeviceSerial;
  };
}
