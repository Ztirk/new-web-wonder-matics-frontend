import { ApiStatus } from "./apiStatus";

export interface SendCard {
  card: {
    card_id: number | string;
    card_code_id: number | null;
    value: string;
    person_id: number;
    owner_type_code_id: number | null;
  };
}

export interface Card extends ApiStatus {
  response: {
    card:
      | {
          RowNum: number | null;
          card_id: number;
          card_type: string;
          value: string;
          owner_name: string;
        }[]
      | [];
    count_data: number;
  };
}

export interface IndividualCard extends ApiStatus {
  response: {
    card: {
      card_id: number;
      value: string;
      card_code_id: number;
      card_type: string;
      owner_type: string;
      owner_name: string;
      person_id: number;
    };
  };
}
