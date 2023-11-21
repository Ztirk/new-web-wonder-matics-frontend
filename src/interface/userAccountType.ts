import { ApiStatus } from "./apiStatus";

export interface UserAccount extends ApiStatus {
  response: {
    RowNum: number | null;
    user_id: number;
    fullname: string;
    username: string;
  }[];
  count_date: number;
}

export interface IndividualUserAccount extends ApiStatus {
  response: {
    userAccount: {
      user_id: number;
      username: string;
      profile_id: number;
      uid: string;
    };
    person: {
      person_id: number;
      fullname: string;
      mobile: string;
      email: string;
      description: string;
      role: string;
    }[];
  };
}
