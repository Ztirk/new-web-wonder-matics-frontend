export interface TestUnion {
  customer: { customer_id: number } | [{ customer_id: number }];
}

export interface Customer {
  test: {
    customer: {
      customer_id: number;
      customer_name: string;
    };
  };
}
