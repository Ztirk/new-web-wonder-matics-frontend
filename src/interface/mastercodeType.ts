export interface MasterCode {
  status: number;
  message: string;
  response: [
    [
      {
        code_id: number;
        category: string;
        class: string | null;
        value: string;
      }
    ]
  ];
}
