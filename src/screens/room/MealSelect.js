import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import {
  Title,
  InputBox,
  CheckButton,
  OptionName,
  DateTimePick,
  Line,
} from "../../components/room2";
import { theme } from "./theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  flex: 1;
`;

const CheckContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-bottom: 10px;
`;

const TimeContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  margin: 5px;
`;

// ---------------------------------------------------------------
const MealSelect = () => {
  const navigation = useNavigation();

  const [schoolFoodStates, setSchoolFoodStates] = useState(
    Array(6).fill(false),
  );

  // 학식 종류들 선택시 결과값(boolean) 배열에 저장
  const handleSchoolFoodButton = (index) => {
    setSchoolFoodStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  const [outFoodStates, setOutFoodStates] = useState(Array(5).fill(false));

  // 외식 종류들 선택시 결과값(boolean) 배열에 저장
  const handleOutFoodButton = (index) => {
    setOutFoodStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  const [menuStates, setMenuStates] = useState(Array(5).fill(false));

  // 음식메뉴 종류들 선택시 결과값(boolean) 배열에 저장
  const handleMenuButton = (index) => {
    setMenuStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  // 검색 버튼 누르면
  const handleInputBoxPress = (keyword) => {
    // 선택한 인덱스만 필터링
    const selectedSchoolFood = schoolFoodStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    const schoolFoodMap = {
      0: "전체",
      1: "천지",
      2: "크누",
      3: "기숙사",
      4: "백록",
      5: "석재",
    };

    // 선택한 인덱스의 키워드 결과
    const schoolFoodResult = selectedSchoolFood.map((id) => schoolFoodMap[id]);

    // 외식도 같은 방법
    const selectedOutFood = outFoodStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    const outFoodMap = {
      0: "전체",
      1: "후문",
      2: "애막골",
      3: "정문",
      4: "명동",
    };

    const outFoodResult = selectedOutFood.map((id) => outFoodMap[id]);

    const selectedMenu = menuStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    // 메뉴 파트도 같은 방법
    const menuMap = {
      0: "전체",
      1: "한식",
      2: "일식",
      3: "양식",
      4: "중식",
    };

    const menuResult = selectedMenu.map((id) => menuMap[id]);

    // ---------------------------------------------------------------
    // Backend로 보낼 객체 생성
    const sendData = {};
    const filterArray = [];
    let count = 1;

    if (keyword != "") {
      sendData["param" + count] = keyword;
      filterArray.push(keyword);
      count++;
    }

    for (let i = 0; i < schoolFoodResult.length; i++) {
      if (schoolFoodResult[i] === "전체") {
        const keys = Object.keys(schoolFoodMap);
        for (let j = 1; j < keys.length; j++) {
          sendData["param" + count] = schoolFoodMap[keys[j]];
          filterArray.push(schoolFoodMap[keys[j]]);
          count++;
        }
        break;
      } else {
        sendData["param" + count] = schoolFoodResult[i];
        filterArray.push(schoolFoodResult[i]);
        count++;
      }
    }

    for (let i = 0; i < outFoodResult.length; i++) {
      if (outFoodResult[i] === "전체") {
        const keys = Object.keys(outFoodMap);
        for (let j = 1; j < keys.length; j++) {
          sendData["param" + count] = outFoodMap[keys[j]];
          filterArray.push(outFoodMap[keys[j]]);
          count++;
        }
        break;
      } else {
        sendData["param" + count] = outFoodResult[i];
        filterArray.push(outFoodResult[i]);
        count++;
      }
    }

    for (let i = 0; i < menuResult.length; i++) {
      if (menuResult[i] === "전체") {
        const keys = Object.keys(menuMap);
        for (let j = 1; j < keys.length; j++) {
          sendData["param" + count] = menuMap[keys[j]];
          filterArray.push(menuMap[keys[j]]);
          count++;
        }
        break;
      } else {
        sendData["param" + count] = menuResult[i];
        filterArray.push(menuResult[i]);
        count++;
      }
    }

    // url에 포함할 파라미터 작성
    const queryString = Object.keys(sendData)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(sendData[key])}`,
      )
      .join("&");

    // ---------------------------------------------------------------
    // 백엔드랑 통신코드
    const url = `http://172.30.1.7:8088/room/searchMeal?${queryString}`;
    const dataArray = [];

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        // JSON 데이터를 파싱하여 다음 then 블록으로 전달
        return response.json();
      })
      .then((data) => {
        // 성공
        //console.log(JSON.stringify(data));

        dataArray.push(...Object.values(data));
        console.log(JSON.stringify(data));
        navigation.navigate("MealResult", { data: dataArray });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <Container>
          <Title title="밥 먹을 두리" />
          <InputBox onPress={(keyword) => handleInputBoxPress(keyword)} />

          <OptionName text={"학식"} />
          <Line />
          <CheckContainer>
            <CheckButton
              text="전체"
              onPress={() => handleSchoolFoodButton(0)}
            />
            <CheckButton
              text="천지"
              onPress={() => handleSchoolFoodButton(1)}
            />
            <CheckButton
              text="크누"
              onPress={() => handleSchoolFoodButton(2)}
            />
            <CheckButton
              text="기숙사"
              onPress={() => handleSchoolFoodButton(3)}
            />
            <CheckButton
              text="백록"
              onPress={() => handleSchoolFoodButton(4)}
            />
            <CheckButton
              text="석재"
              onPress={() => handleSchoolFoodButton(5)}
            />
          </CheckContainer>

          <OptionName text={"외식"} />
          <Line />
          <CheckContainer>
            <CheckButton text="전체" onPress={() => handleOutFoodButton(0)} />
            <CheckButton text="후문" onPress={() => handleOutFoodButton(1)} />
            <CheckButton text="애막골" onPress={() => handleOutFoodButton(2)} />
            <CheckButton text="정문" onPress={() => handleOutFoodButton(3)} />
            <CheckButton text="명동" onPress={() => handleOutFoodButton(4)} />
          </CheckContainer>

          <OptionName text={"메뉴"} />
          <Line />
          <CheckContainer>
            <CheckButton text="전체" onPress={() => handleMenuButton(0)} />
            <CheckButton text="한식" onPress={() => handleMenuButton(1)} />
            <CheckButton text="일식" onPress={() => handleMenuButton(2)} />
            <CheckButton text="양식" onPress={() => handleMenuButton(3)} />
            <CheckButton text="중식" onPress={() => handleMenuButton(4)} />
          </CheckContainer>

          <TimeContainer>
            {/* <OptionName text={"시간설정"} />
            <Line />
            <DateTimePick /> */}
          </TimeContainer>
        </Container>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default MealSelect;
