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
const ExerciseSelect = () => {
  const navigation = useNavigation();

  const [typeStates, setTypeStates] = useState(Array(10).fill(false));

  // 운동 종류 선택시 결과값(boolean) 배열에 저장
  const handleTypeButton = (index) => {
    setTypeStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  const [locationStates, setLocationStates] = useState(Array(6).fill(false));

  // 위치 선택시 결과값(boolean) 배열에 저장
  const handleLocationButton = (index) => {
    setLocationStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  // 검색 버튼 누르면
  const handleInputBoxPress = (keyword) => {
    // 선택한 인덱스만 필터링
    const selectedType = typeStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    const typeMap = {
      0: "전체",
      1: "헬스",
      2: "골프",
      3: "탁구",
      4: "농구",
      5: "야구",
      6: "배드민턴",
      7: "자전거",
      8: "등산",
      9: "복싱",
    };

    const typeResult = selectedType.map((id) => typeMap[id]);

    const selectedLocation = locationStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    const locationMap = {
      0: "전체",
      1: "후문",
      2: "애막골",
      3: "정문",
      4: "공쪽",
      5: "기숙사",
    };

    // 선택한 인덱스의 키워드 결과
    const locationResult = selectedLocation.map((id) => locationMap[id]);

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

    for (let i = 0; i < typeResult.length; i++) {
      if (typeResult[i] === "전체") {
        const keys = Object.keys(typeMap);
        for (let j = 1; j < keys.length; j++) {
          sendData["param" + count] = typeMap[keys[j]];
          filterArray.push(typeMap[keys[j]]);
          count++;
        }
        break;
      } else {
        sendData["param" + count] = typeResult[i];
        filterArray.push(typeResult[i]);
        count++;
      }
    }

    for (let i = 0; i < locationResult.length; i++) {
      if (locationResult[i] === "전체") {
        const keys = Object.keys(locationMap);
        for (let j = 1; j < keys.length; j++) {
          sendData["param" + count] = locationMap[keys[j]];
          filterArray.push(locationMap[keys[j]]);
          count++;
        }
        break;
      } else {
        sendData["param" + count] = locationResult[i];
        filterArray.push(locationResult[i]);
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
    const url = `http://172.30.1.45:8088/room/searchByKeyword?${queryString}`;
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
          <Title title="운동 할 두리" />
          <InputBox onPress={(keyword) => handleInputBoxPress(keyword)} />

          <OptionName text={"종류"} />
          <Line />
          <CheckContainer>
            <CheckButton text="전체" onPress={() => handleTypeButton(0)} />
            <CheckButton text="헬스" onPress={() => handleTypeButton(1)} />
            <CheckButton text="골프" onPress={() => handleTypeButton(2)} />
            <CheckButton text="탁구" onPress={() => handleTypeButton(3)} />
            <CheckButton text="농구" onPress={() => handleTypeButton(4)} />
            <CheckButton text="야구" onPress={() => handleTypeButton(5)} />
            <CheckButton text="배드민턴" onPress={() => handleTypeButton(6)} />
            <CheckButton text="자전거" onPress={() => handleTypeButton(7)} />
            <CheckButton text="등산" onPress={() => handleTypeButton(8)} />
            <CheckButton text="복싱" onPress={() => handleTypeButton(9)} />
          </CheckContainer>

          <OptionName text={"위치"} />
          <Line />
          <CheckContainer>
            <CheckButton text="전체" onPress={() => handleLocationButton(0)} />
            <CheckButton text="후문" onPress={() => handleLocationButton(1)} />
            <CheckButton
              text="애막골"
              onPress={() => handleLocationButton(2)}
            />
            <CheckButton text="정문" onPress={() => handleLocationButton(3)} />
            <CheckButton text="공쪽" onPress={() => handleLocationButton(4)} />
            <CheckButton
              text="기숙사"
              onPress={() => handleLocationButton(5)}
            />
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

export default ExerciseSelect;
