import { ApiStatus } from "./apiStatus";

export interface FleetIterate {
  RowNum: number;
  fleet_id: number;
  fleet_name: string;
  vehicle_count: number;
}

export interface Fleet extends ApiStatus {
  response: {
    fleet: FleetIterate[] | [];
  };
}

export interface IndividualFleet extends ApiStatus {
  response: {
    fleet:
      | {
          RowNum: number;
          fleet_id: number;
          fleet_name: string;
          vehicle_count: number;
        }
      | Fleet;
  };
}
