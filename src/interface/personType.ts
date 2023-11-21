import { ApiStatus } from "./apiStatus";

export interface SendPerson {
  person: {
    person_id: number | string;
    firstname: string;
    lastname: string;
    nickname: string;
    title_code_id: number | null;
    description: string;
    mobile: string;
    email: string;
    line: string;
    roleDelete: number[];
    role: number[];
  };
}

export interface Person extends ApiStatus {
  response: {
    person:
      | {
          RowNum: number | null;
          person_id: number;
          fullname: string;
          email: string;
          mobile: string;
          description: string;
          role: string;
        }[]
      | [];
    count_data: number;
  };
}

export interface IndividualPerson extends ApiStatus {
  response: {
    person: {
      person_id: number;
      firstname: string;
      lastname: string;
      nickname: string;
      title_code_id: number;
      title_type: string;
      description: string;
      role: [{ role_code_id: number; role_type: string }];
    };
  };
}
