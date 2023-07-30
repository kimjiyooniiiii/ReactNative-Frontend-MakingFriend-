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
const StudySelect = () => {
  const navigation = useNavigation();

  const [locationStates, setLocationStates] = useState(Array(6).fill(false));

  // 위치들 선택시 결과값(boolean) 배열에 저장
  const handleLocationButton = (index) => {
    setLocationStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  const [periodStates, setPeriodStates] = useState(Array(4).fill(false));

  // 기간 선택시 결과값(boolean) 배열에 저장
  const handlePeriodButton = (index) => {
    setPeriodStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  const [typeStates, setTypeStates] = useState(Array(4).fill(false));

  // 분류(자격증,팀플,공모전) 선택시 결과값(boolean) 배열에 저장
  const handleTypeButton = (index) => {
    setTypeStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  // 검색 버튼 누르면
  const handleInputBoxPress = (keyword) => {
    // 선택한 인덱스만 필터링
    const selectedLocation = locationStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    const locationMap = {
      0: "전체",
      1: "도서관",
      2: "카페",
      3: "정문",
      4: "공쪽",
      5: "후문",
    };

    // 선택한 인덱스의 키워드 결과
    const locationResult = selectedLocation.map((id) => locationMap[id]);

    const selectedPeriod = periodStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    const periodMap = {
      0: "전체",
      1: "번개",
      2: "단기",
      3: "장기",
    };

    const periodResult = selectedPeriod.map((id) => periodMap[id]);

    const selectedType = typeStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    const typeMap = {
      0: "전체",
      1: "자격증",
      2: "팀플",
      3: "공모전",
    };

    const typeResult = selectedType.map((id) => typeMap[id]);

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

    for (let i = 0; i < periodResult.length; i++) {
      if (periodResult[i] === "전체") {
        const keys = Object.keys(periodMap);
        for (let j = 1; j < keys.length; j++) {
          sendData["param" + count] = periodMap[keys[j]];
          filterArray.push(periodMap[keys[j]]);
          count++;
        }
        break;
      } else {
        sendData["param" + count] = periodResult[i];
        filterArray.push(periodResult[i]);
        count++;
      }
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

    // url에 포함할 파라미터 작성
    const queryString = Object.keys(sendData)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(sendData[key])}`,
      )
      .join("&");

    // ---------------------------------------------------------------
    // 백엔드랑 통신코드
    const url = `http://172.30.1.22:8088/room/searchByKeyword?${queryString}`;
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
          <Title title="스터디 할 두리" />
          <InputBox onPress={(keyword) => handleInputBoxPress(keyword)} />

          <OptionName text={"위치"} />
          <Line />
          <CheckContainer>
            <CheckButton text="전체" onPress={() => handleLocationButton(0)} />
            <CheckButton
              text="도서관"
              onPress={() => handleLocationButton(1)}
            />
            <CheckButton text="카페" onPress={() => handleLocationButton(2)} />
            <CheckButton text="정문" onPress={() => handleLocationButton(3)} />
            <CheckButton text="공쪽" onPress={() => handleLocationButton(4)} />
            <CheckButton text="후문" onPress={() => handleLocationButton(5)} />
          </CheckContainer>

          <OptionName text={"기간"} />
          <Line />
          <CheckContainer>
            <CheckButton text="전체" onPress={() => handlePeriodButton(0)} />
            <CheckButton text="번개" onPress={() => handlePeriodButton(1)} />
            <CheckButton text="단기" onPress={() => handlePeriodButton(2)} />
            <CheckButton text="장기" onPress={() => handlePeriodButton(3)} />
          </CheckContainer>

          <OptionName text={"분류"} />
          <Line />
          <CheckContainer>
            <CheckButton text="전체" onPress={() => handleTypeButton(0)} />
            <CheckButton text="자격증" onPress={() => handleTypeButton(1)} />
            <CheckButton text="팀플" onPress={() => handleTypeButton(2)} />
            <CheckButton text="공모전" onPress={() => handleTypeButton(3)} />
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

export default StudySelect;
