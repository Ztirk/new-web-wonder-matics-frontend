import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { togglePropsPopUpState } from "../features/togglePropsPopUpSlice";

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

  return (
    <div>
      <input type="file" onChange={inputFile} />
      <button onClick={addForm}>add</button>
      <button onClick={deleteForm}>delete</button>
      <button onClick={logForm}>log</button>
    </div>
  );
}
