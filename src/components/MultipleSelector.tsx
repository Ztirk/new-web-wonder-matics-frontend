import { useState, useRef, useEffect } from "react";

export default function MultipleSelector() {
  const [toggleMultipleSelector, setToggleMultipleSelector] =
    useState<boolean>(false);

  const handleToggleMultipleSelector = () => {
    setToggleMultipleSelector(!toggleMultipleSelector);
  };

  useEffect(() => {}, []);
  return (
    <>
      {/* invisible bg */}
      <div
        className={`input-n-selector__invisible_bg ${
          toggleMultipleSelector ? "" : "hidden"
        }`}
        onClick={handleToggleMultipleSelector}
      ></div>

      {/* selector */}
      <div
        className="input-n-selector__border input-n-selector__size flex items-center"
        onClick={handleToggleMultipleSelector}
      >
        <span className="w-[200px] overflow-hidden">hello</span>
        <i className="fa-solid fa-caret-down" />
      </div>

      {/* selector dropdown */}
      <div
        className={`input-n-selector__border input-n-selector__shadow w-[240px] absolute bg-white z-10 ${
          toggleMultipleSelector ? "" : "hidden"
        }`}
      >
        {/* <ul>
          {masterCode.map((data) => (
            <li
              className={` grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md`}
            >
              <input
                type="checkbox"
                className="h-[20px] w-[20px] mx-3"
                onChange={handleChecked}
                id={data.code_id.toString()}
              />
              <label
                htmlFor={data.code_id.toString()}
                className="h-full flex items-center"
              >
                {data.value}
              </label>
            </li>
          ))}
        </ul> */}
      </div>
    </>
  );
}
