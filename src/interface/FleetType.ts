import { ApiStatus } from "./apiStatus";

export interface Fleet extends ApiStatus {
  response: {
    fleet:
      | [
          {
            RowNum: number;
            fleet_id: number;
            fleet_name: string;
            vehicle_count: number;
          }
        ]
      | [];
  };
}

export interface IndividualFleet extends ApiStatus {
  fleet:
    | {
        RowNum: number;
        fleet_id: number;
        fleet_name: string;
        vehicle_count: number;
      }
    | Fleet;
}
