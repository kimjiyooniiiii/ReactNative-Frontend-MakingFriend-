import RoomSelect from "./RoomSelect_two";

import { useState } from "react";

const HobbySearch = () => {
  const [type, setType] = useState({
    전체: false,
    영화: false,
    코노: false,
    볼링: false,
    포켓볼: false,
    자전거: false,
    당구: false,
    보드게임: false,
    카페투어: false,
  });

  const [onlineGame, setOnlineGame] = useState({
    전체: false,
    롤: false,
    배그: false,
    서든: false,
    피파: false,
    스팀: false,
    오버워치: false,
  });

  return (
    <RoomSelect
      oneMenu={[type, setType]}
      twoMenu={[onlineGame, setOnlineGame]}
      title={"취미 같이 할 두리"}
      one={"종류"}
      two={"온라인 게임"}
      navi={"HobbyResult"}
    ></RoomSelect>
  );
};

export default HobbySearch;
