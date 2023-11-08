import { ApiStatus } from "./apiStatus";

export interface FleetIterate {
  RowNum: number;
  fleet_id: number;
  fleet_name: string;
  vehicle_count: number;
}

export interface FleetDisplay {
  fleet: FleetIterate[] | [];
}

export interface SendFleet {
  fleet: {
    fleet_id: number;
    fleet_name: string;
    parent_fleet_id: number;
  };
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
