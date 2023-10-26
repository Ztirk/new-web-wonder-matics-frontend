import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Test() {
  const handleClick = () => {
    console.log(import.meta.env.VITE_ERP_BASE_URL);
  };

  return (
    <div>
      <button onClick={handleClick}>jlkasdfjkl;daslkjf</button>
    </div>
  );
}
