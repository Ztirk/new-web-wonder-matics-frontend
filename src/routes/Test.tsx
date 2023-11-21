import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { togglePropsPopUpState } from "../features/togglePropsPopUpSlice";

export default function Test() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [form, setForm] = useState(new FormData());

  const t = useSelector(togglePropsPopUpState);

  const inputFile: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setFiles(e.currentTarget.files);
  };

  const test = async () => {
    if (files) {
      form.append("files", files[0]);
    }
    // console.log(form.getAll("files"));

    // const f = new FormData();

    // for (const obj of form.getAll("files")) {
    //   f.append("files", obj);
    // }

    form.append(
      "jsonData",
      JSON.stringify({
        action_by: 123,
        document: {
          document_code_id: 6,
          customer_id: null,
          person_id: null,
          address_id: null,
          vehicle_id: null,
        },
      })
    );

    form.delete("files");
    // const res = await axios.post("http://10.0.102.61:3001/document", form);
    // console.log(res.data);
  };

  return (
    <div>
      <input type="file" onChange={inputFile} />
      <button onClick={test}></button>
      <p>{t.id}</p>
    </div>
  );
}
