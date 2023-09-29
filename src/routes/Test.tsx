import { useSelector, useDispatch } from "react-redux";
import { editedState, setPersonExist } from "../features/editedReducer";
import { useEffect } from "react";

export default function Test() {
  const edited = useSelector(editedState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(edited);
  }, [edited]);

  const handleClick1 = () => {
    const form = document.getElementById("form") as HTMLFormElement;
    form.submit();
  };

  return (
    <div>
      <form id="form">
        <input required placeholder="lsakjf;sda;j" />
      </form>
      <button type="submit" onClick={handleClick1}>
        กด
      </button>
    </div>
  );
}
