import React, { useState, useRef, useEffect } from "react";

export default function SearchSelector() {
  const [selectedOptions, setSelectedOptions] = useState("");
  const [toggleSearchSelector, setToggleSearchSelector] =
    useState<boolean>(false);

  const handleToggleSearchSelector = () => {
    setToggleSearchSelector(!toggleSearchSelector);
  };

  const fleet = [
    { fleet_id: 1, value: "fleet1" },
    { fleet_id: 2, value: "fleet2" },
  ];

  const [searchFleet, setSearchFleet] = useState(fleet);

  const handleFilter: (e: React.KeyboardEvent<HTMLInputElement>) => void = (
    e
  ) => {
    if (e.key == "Enter") {
      console.log("hello");
      setSearchFleet(
        searchFleet.filter((fleet) => fleet == e.currentTarget.textContent)
      );
    }
  };

  const handleSelect: (e: React.MouseEvent<HTMLDivElement>) => void = (e) => {
    setSelectedOptions(e.currentTarget.textContent);
  };

  return (
    <>
      {/* invisible bg */}
      <div
        className={`input-n-selector__invisible_bg ${
          toggleSearchSelector ? "" : "hidden"
        }`}
        onClick={handleToggleSearchSelector}
      ></div>

      {/* search selector */}
      <div
        className="input-n-selector__border input-n-selector__size flex items-center"
        onClick={handleToggleSearchSelector}
      >
        <span className="w-[200px] overflow-hidden">{selectedOptions}</span>
        <i className="fa-solid fa-caret-down" />
      </div>

      {/* search selector dropdown */}
      <div
        className={`input-n-selector__border input-n-selector__shadow w-[240px] absolute bg-white z-10 ${
          toggleSearchSelector ? "" : "hidden"
        }`}
      >
        {/* search selector */}
        <div className="input-n-selector__border p-2 m-1 grid grid-cols-[auto_1fr] gap-3">
          <label htmlFor="">
            <i className="fa-solid fa-magnifying-glass" />
          </label>
          <input
            className="w-full"
            placeholder="ค้นหาชื่อฟลีต"
            onKeyDown={handleFilter}
          />
        </div>
        <ul>
          {searchFleet.map((data) => (
            <li
              className={` grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md`}
              onClick={handleSelect}
            >
              {data.value}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
