import { useSelector, useDispatch } from "react-redux";
import { editedState, setPersonExist } from "../features/editedReducer";
import { useEffect, useState } from "react";
import { displayState } from "../features/displayReducer";
import Td from "../components/Td";
import Tr from "../components/Tr";
import { useNavigate } from "react-router-dom";

export default function Test() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return <div>kslajdfj;lkas;kljfs</div>;
}
