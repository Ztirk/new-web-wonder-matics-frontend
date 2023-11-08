import { ApiStatus } from "./apiStatus";

export interface PersonIterate {
  RowNum: number;
  person_id: number;
  fullname: string;
  email: string;
  mobile: string;
  description: string;
  role: string;
}

export interface PersonDisplay {
  person: PersonIterate[] | [];
}

export interface SendPerson {
  person: {
    person_id: number;
    firstname: string;
    lastname: string;
    nickname: string;
    title_code_id: number;
    description: string;
    roleDelete: number[];
    role: number[];
  };
}

export interface Person extends ApiStatus {
  response: {
    person: PersonIterate[] | [];
  };
}

export interface IndividualPerson extends ApiStatus {
  response:
    | {
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
      }
    | Person;
}
