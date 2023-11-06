import { Fragment, useEffect, useRef, useState } from "react";

import Selector from "../components/Selector";
import {
  displayState,
  setDisplayAddressFetch,
  setDisplayPersonFetch,
} from "../features/displaySlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Input from "../components/Input";
import { useSearchParams } from "react-router-dom";

export default function Test() {
  const filter = useRef();

  const display = useSelector(displayState);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setDisplayAddressFetch("eiei"));
    setSearchParams({filter: 'bro'});
  };

  useEffect(() => {
    console.log(display);
  }, [display]);

  return (
    <div>
      <button onClick={handleClick}>hello</button>
    </div>
  );
}
