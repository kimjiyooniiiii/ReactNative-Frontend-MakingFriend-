import RoomSelect from "./RoomSelect_two";

import { useState } from "react";

const ExerciseSearch = () => {
  const [type, setType] = useState({
    전체: false,
    헬스: false,
    골프: false,
    탁구: false,
    농구: false,
    야구: false,
    배드민턴: false,
    자전거: false,
    등산: false,
    복싱: false,
  });

  const [location, setLocation] = useState({
    전체: false,
    후문: false,
    애막골: false,
    정문: false,
    공쪽: false,
    기숙사: false,
  });

  return (
    <RoomSelect
      oneMenu={[type, setType]}
      twoMenu={[location, setLocation]}
      title={"운동할 두리"}
      one={"종류"}
      two={"위치"}
      navi={"ExerciseResult"}
    ></RoomSelect>
  );
};

export default ExerciseSearch;
