import { useSelector, useDispatch } from "react-redux";
import { editedState, setPersonExist } from "../features/editedReducer";
import { useEffect, useState } from "react";
import { displayState } from "../features/displayReducer";
import Td from "../components/Td";
import Tr from "../components/Tr";
import { useNavigate } from "react-router-dom";
import { TestUnion } from "../interface/test";

export default function Test() {
  const data = [1, 1, 1];

  useEffect(() => {}, []);

  return (
    <div>
      {data.map((data, i) => (
        <div key={i}>hello</div>
      ))}
      {data.map((data, i) => (
        <div key={i}>hello</div>
      ))}
    </div>
  );
}
