import RoomSelect from "./RoomSelect_two";

import { useState } from "react";

const ForeignerSearch = () => {
  const [myLang, setMyLang] = useState({
    전체: false,
    영어: false,
    일본어: false,
    중국어: false,
    러시아어: false,
    불어: false,
    독일어: false,
    한국어: false,
    아랍어: false,
  });

  const [yourLang, setYourLang] = useState({
    전체: false,
    영어: false,
    일본어: false,
    중국어: false,
    러시아어: false,
    불어: false,
    독일어: false,
    한국어: false,
    아랍어: false,
  });

  return (
    <RoomSelect
      oneMenu={[myLang, setMyLang]}
      twoMenu={[yourLang, setYourLang]}
      title={"외국인 두리 만나기"}
      one={"내 언어"}
      two={"친구 언어"}
      navi={"ForeignerResult"}
    ></RoomSelect>
  );
};

export default ForeignerSearch;
