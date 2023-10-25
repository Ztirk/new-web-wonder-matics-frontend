import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Test() {
  const handleClick = () => {
    console.log(uuidv4());
  };

  return (
    <div>
      <button onClick={handleClick}>jlkasdfjkl;daslkjf</button>
    </div>
  );
}
