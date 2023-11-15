import { Fragment, useEffect, useRef, useState } from "react";
import { Customer } from "../interface/test";

export default function Test() {
  const customerData: Customer["test"]["customer"] = {
    
  };

  return <div>{customerData.customer_id}</div>;
}
