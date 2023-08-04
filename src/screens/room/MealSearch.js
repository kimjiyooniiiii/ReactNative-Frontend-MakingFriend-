import RoomSelect from "./RoomSelect_three";

import { useState } from "react";

const MealSearch = () => {
  const [schoolFood, setSchoolFood] = useState({
    전체: false,
    천지: false,
    크누: false,
    기숙사: false,
    백록: false,
    석재: false,
  });

  const [outFood, setOutFood] = useState({
    전체: false,
    후문: false,
    애막골: false,
    정문: false,
    명동: false,
  });

  const [menu, setMenu] = useState({
    전체: false,
    한식: false,
    일식: false,
    양식: false,
    중식: false,
  });

  return (
    <RoomSelect
      oneMenu={[schoolFood, setSchoolFood]}
      twoMenu={[outFood, setOutFood]}
      threeMenu={[menu, setMenu]}
      title={"밥 먹을 두리"}
      one={"학식"}
      two={"외식"}
      three={"메뉴"}
      navi={"MealResult"}
    ></RoomSelect>
  );
};

export default MealSearch;
