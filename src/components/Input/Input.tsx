import { Fragment } from "react";
import Button from "../Button/Button";
import { key } from "localforage";

interface Props {
  label?: string;
  type: "checkbox" | "filter" | "regular" | "file" | "date";
  placeholder?: string;
  name?: string;
  defaultValue?: string;
  id?: string;
  refObject: React.RefObject<HTMLInputElement>;
  disabled: boolean;
  onClick?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFile?: React.Dispatch<React.SetStateAction<FileList[0] | null>>;
  required: boolean;
}

export default function Input({
  label,
  type,
  placeholder,
  name,
  defaultValue,
  id,
  refObject,
  disabled,
  onClick,
  onChange,
  setFile,
  required,
}: Props) {
  return (
    <Fragment>
      {type !== "checkbox" ? (
        <div
          className={`flex ${
            type == "filter"
              ? "gap-5 items-center"
              : type == "regular" || type == "file" || type == "date"
              ? "flex-col"
              : ""
          }`}
        >
          <label htmlFor={""} className="font-bold">
            {label}
          </label>

          <input
            id={id}
            className={`px-3 border rounded-md h-[40px] w-[240px] ${
              required ? "border-[#DC3545]" : "border"
            }`}
            placeholder={placeholder}
            disabled={disabled}
            list="data"
            name={name}
            defaultValue={defaultValue == undefined ? "" : defaultValue}
            ref={refObject}
            onChange={
              type == "file"
                ? (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.currentTarget.files) {
                      setFile(e.currentTarget.files[0]);
                    }
                  }
                : onChange
            }
            type={type == "file" ? "file" : type == "date" ? "date" : ""}
            onKeyDown={onClick}
            // onKeyDown={handleEnter}
          />

          {type == "filter" ? <Button name="ค้นหา" onClick={onClick} /> : <></>}
        </div>
      ) : (
        <input type="checkbox" className="h-[20px] w-full" />
      )}
    </Fragment>
  );
}
