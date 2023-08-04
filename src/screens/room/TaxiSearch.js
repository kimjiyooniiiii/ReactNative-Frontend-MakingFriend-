import RoomSelect from "./RoomSelect_two";

import { useState } from "react";

const TaxiSearch = () => {
  const [startPoint, setStartPoint] = useState({
    전체: false,
    새롬관: false,
    이룸관: false,
    국지원: false,
    난지원: false,
    퇴계관: false,
    재정: false,
    백록관: false,
    후문: false,
  });

  const [finalPoint, setFinalPoint] = useState({
    전체: false,
    후문: false,
    애막골: false,
    정문: false,
    명동: false,
    기타: false,
  });

  return (
    <RoomSelect
      oneMenu={[startPoint, setStartPoint]}
      twoMenu={[finalPoint, setFinalPoint]}
      title={"택시 탈 두리"}
      one={"출발지"}
      two={"목적지"}
      navi={"TaxiResult"}
    ></RoomSelect>
  );
};

export default TaxiSearch;
