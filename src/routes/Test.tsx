import { useSearchParams } from "react-router-dom";
import { IndividualData } from "../interface/dataType";

export default function Test() {
  const individualData: IndividualData = {};

  const [searchParams, setSearchParams] = useSearchParams();

  const params = () => {
    setSearchParams({wtf: searchParams.get('new'), eiei: 'world'});
  };
  return (
    <div>
      <button onClick={params}>kljasdf;ljads;ljk</button>
    </div>
  );
}
