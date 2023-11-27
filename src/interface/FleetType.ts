import { ApiStatus } from "./apiStatus";

export interface FleetSelector extends ApiStatus {
  response: {
    fleets: {
      fleet_id: number;
      fleet_name: string;
    }[];
  };
}

export interface ChildFleets extends ApiStatus {
  response: {
    fleet: {
      RowNum: number;
      fleet_id: number;
      parent_fleet_id: number;
      fleet_name: string;
      vehicle_count: number;
      have_child: boolean;
      layer: number;
    }[];
  };
}

export interface SendFleet {
  fleet: {
    fleet_id: number | string;
    fleet_name: string;
    parent_fleet_id: number | null;
  };
}

export interface Fleet extends ApiStatus {
  response: {
    fleet:
      | {
          RowNum: number | null;
          fleet_id: number;
          fleet_name: string;
          parent_fleet_id: number | null;
          vehicle_count: number;
          have_child: boolean;
          layer: number;
        }[]
      | [];
    count_data: number;
  };
}

export interface IndividualFleet extends ApiStatus {
  response: {
    fleet: {
      fleet_id: number;
      fleet_name: string;
      parent_fleet_id: number;
      parent_fleet_name: string;
    };
  };
}
