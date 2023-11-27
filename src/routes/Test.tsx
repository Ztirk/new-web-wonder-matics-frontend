import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { togglePropsPopUpState } from "../features/togglePropsPopUpSlice";
import ReactDOM from "react-dom";
import { FixedSizeList } from "react-window";

export default function Test() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [form, setForm] = useState(new FormData());

  const t = useSelector(togglePropsPopUpState);

  const inputFile: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setFiles(e.currentTarget.files);
  };

  const logForm = () => {
    for (const obj of form.getAll("files") as File[]) {
      console.log(obj);
    }
  };

  const addForm = () => {
    const newForm = new FormData();
    if (files) {
      for (const i in form.getAll("files") as File[]) {
        newForm.append("files", form.getAll("files")[i]);
      }
      newForm.append("files", files[0]);
      setForm(newForm);
    }
  };

  const deleteForm = () => {
    const newForm = new FormData();

    for (const obj of form.getAll("files") as File[]) {
      if (obj.name !== "krit15489@gmail.com_accessKeys (5).csv") {
        newForm.append("files", obj);
      }
    }

    setForm(newForm);
  };

  useEffect(() => {
    console.log(form.getAll("files"));
  }, [form]);

  const [dateTime, setDateTime] = useState("2023-10-25T08:30:00.000");

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // 2023-10-25T08:30:00.000Z
    console.log(e.currentTarget.value);

    const date = new Date();

    console.log("2023-10-25T08:30:00.000" instanceof Date);
  };

  const Row = () => (
    <>
      <div>Row a</div>
      <div>Row b</div>
      <div>Row c</div>
      <div>Row</div>
    </>
  );

  return (
    <>
      <div>
        <input type="file" onChange={inputFile} />
        <button onClick={addForm}>add</button>
        <button onClick={deleteForm}>delete</button>
        <button onClick={logForm}>log</button>
      </div>
      <input type="datetime-local" value={dateTime} onClick={handleClick} />
      <FixedSizeList height={500} width={300} itemCount={1} itemSize={50}>
        {Row}
      </FixedSizeList>
    </>
  );
}
