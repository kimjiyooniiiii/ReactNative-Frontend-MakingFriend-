import RoomSelect from "./RoomSelect_three";

import { useState } from "react";

const DeliverySearch = () => {
  const [location, setLocationFood] = useState({
    전체: false,
    후문: false,
    애막골: false,
    정문: false,
    명동: false,
    기타: false,
  });

  const [dormitory, setDormitory] = useState({
    전체: false,
    새롬관: false,
    이룸관: false,
    국지원: false,
    난지원: false,
    퇴계관: false,
    재정: false,
  });

  const [menu, setMenu] = useState({
    전체: false,
    한식: false,
    일식: false,
    양식: false,
    중식: false,
    카페: false,
  });

  return (
    <RoomSelect
      oneMenu={[location, setLocationFood]}
      twoMenu={[dormitory, setDormitory]}
      threeMenu={[menu, setMenu]}
      title={"배달 시킬 두리"}
      one={"위치"}
      two={"기숙사"}
      three={"메뉴"}
      navi={"DeliveryResult"}
    ></RoomSelect>
  );
};

export default DeliverySearch;
