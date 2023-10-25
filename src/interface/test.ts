export interface TestUnion {
  customer: { customer_id: number } | [{ customer_id: number }];
}
