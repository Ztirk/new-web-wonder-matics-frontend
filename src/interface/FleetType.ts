import { ApiStatus } from "./customerType";

export interface Fleet extends ApiStatus {
  response: {
    fleet: [
      {
        fleet_id: number;
        fleet_name: string;
        parent_fleet_id: number;
      }
    ];
  };
}
