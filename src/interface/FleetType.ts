import { ApiStatus } from "./apiStatus";
export interface SendFleet {
  fleet: {
    fleet_id: number;
    fleet_name: string;
    parent_fleet_id: number | null;
  };
}
export interface FleetIterate {
  RowNum: number;
  fleet_id: number;
  fleet_name: string;
  vehicle_count: number;
}

export interface StoringIndividualFleet {
  RowNum: number;
  fleet_id: number;
  fleet_name: string;
  vehicle_count: number;
}

export interface FleetDisplay {
  fleet: FleetIterate[] | [];
}

export interface Fleet extends ApiStatus {
  response: {
    fleet: FleetIterate[] | [];
  };
}

export interface IndividualFleet extends ApiStatus {
  response: {
    fleet: StoringIndividualFleet;
  };
}
