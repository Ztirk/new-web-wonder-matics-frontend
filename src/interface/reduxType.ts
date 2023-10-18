export interface setContact {
  contact_code_id: number;
  value: string;
}

export interface Person {
  person_id: number;
  fullname: string;
  mobile: string;
  email: string;
  description: string;
  role: string;
}

export interface Contact {
  contact_id: number;
  value: string;
  contact_type: string;
  owner_name: string;
}

export interface putPostContact {
  contact_code_id: number;
  value: string;
}
export interface Address {
  address_id: number;
  location: string;
  address_type: string;
}
