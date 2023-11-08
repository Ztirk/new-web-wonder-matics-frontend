export interface Selector {
  code_id: number;
  category: string;
  class: string | null;
  value: string;
}

export interface MasterCode {
  status: number;
  message: string;
  response: Selector[][];
}
