import { ApiStatus } from "./customerType";

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
