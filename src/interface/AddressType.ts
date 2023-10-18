import { ApiStatus } from "./dataType";

export interface Address extends ApiStatus {
  response: {
    address: [
      {
        address_id: number;
        location: string;
        address_type: string;
      }
    ];
  };
}
