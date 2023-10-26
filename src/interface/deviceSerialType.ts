import { ApiStatus } from "./apiStatus";

export interface DeviceSerial extends ApiStatus {
  response: {
    deviceSerial: [
      {
        RowNum: number;
        device_serial_id: number;
        serial_id: string;
        device_type: string;
        create_date: string;
      }
    ];
  };
}

export interface IndividualDeviceSerial extends ApiStatus {
  response:
    | {
        device: {
          RowNum: number;
          device_id: number;
          veh_id: number;
          device_serial_id: number;
          box_type: string;
          sim_type: string;
        };
      }
    | DeviceSerial;
}
