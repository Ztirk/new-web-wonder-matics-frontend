import { Fragment, useEffect, useRef, useState } from "react";

import Selector from "../components/Selector";
import { displayState, setDisplayPersonFetch } from "../features/displaySlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Test() {
  const dispatch = useDispatch();
  const display = useSelector(displayState);

  useEffect(() => {
    console.log(display);
  }, [display]);

  return (
    <div>
      <Selector />
      <Selector />
      <Selector />
    </div>
  );
}
