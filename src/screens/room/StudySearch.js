import RoomSelect from "./RoomSelect_three";

import { useState } from "react";

const StudySearch = () => {
  const [location, setLocation] = useState({
    전체: false,
    도서관: false,
    카페: false,
    정문: false,
    공쪽: false,
    후문: false,
  });

  const [period, setPeriod] = useState({
    전체: false,
    번개: false,
    단기: false,
    장기: false,
  });

  const [type, setType] = useState({
    전체: false,
    자격증: false,
    팀플: false,
    공모전: false,
  });

  return (
    <RoomSelect
      oneMenu={[location, setLocation]}
      twoMenu={[period, setPeriod]}
      threeMenu={[type, setType]}
      title={"스터디 할 두리"}
      one={"위치"}
      two={"기간"}
      three={"분류"}
      navi={"StudyResult"}
    ></RoomSelect>
  );
};

export default StudySearch;
