import { ApiStatus } from "./apiStatus";

export interface FleetShape {
  fleet: [FleetIterate] | [];
}

export interface FleetIterate {
  RowNum: number;
  fleet_id: number;
  fleet_name: string;
  vehicle_count: number;
}

export interface Fleet extends ApiStatus {
  response: {
    fleet: FleetShape;
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
