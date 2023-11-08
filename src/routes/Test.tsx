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
import { useNavigate, useSearchParams } from "react-router-dom";
import { getData } from "../api/getData";

export default function Test() {
  const data = [{ code_id: 1 }, { code_id: 2 }];
  const [state, setState] = useState(1);

  useEffect(() => {
    console.log(state);
  }, []);

  const id = () => {
    const id = data.filter((data) => data.code_id !== state);

    return <>{id[0].code_id}</>;
  };

  return (
    <div>
      <button>{id()}</button>
      <button onClick={() => setState(state + 1)}>bro</button>
    </div>
  );
}
