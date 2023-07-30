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
const ForeignerSelect = () => {
  const navigation = useNavigation();

  const [myLangStates, setMyLangStates] = useState(Array(9).fill(false));

  // 운동 종류 선택시 결과값(boolean) 배열에 저장
  const handleMyLangButton = (index) => {
    setMyLangStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  const [yourLangStates, setYourLangStates] = useState(Array(9).fill(false));

  // 위치 선택시 결과값(boolean) 배열에 저장
  const handleYourLangButton = (index) => {
    setYourLangStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  // 검색 버튼 누르면
  const handleInputBoxPress = (keyword) => {
    // 선택한 인덱스만 필터링
    const selectedMyLang = myLangStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    const myLangMap = {
      0: "전체",
      1: "영어",
      2: "일본어",
      3: "중국어",
      4: "러시아어",
      5: "불어",
      6: "독일어",
      7: "한국어",
      8: "아랍어",
    };

    const myLangResult = selectedMyLang.map((id) => myLangMap[id]);

    const selectedYourLang = yourLangStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    const yourLangMap = {
      0: "전체",
      1: "영어",
      2: "일본어",
      3: "중국어",
      4: "러시아어",
      5: "불어",
      6: "독일어",
      7: "한국어",
      8: "아랍어",
    };

    // 선택한 인덱스의 키워드 결과
    const yourLangResult = selectedYourLang.map((id) => yourLangMap[id]);

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

    for (let i = 0; i < myLangResult.length; i++) {
      if (myLangResult[i] === "전체") {
        const keys = Object.keys(myLangMap);
        for (let j = 1; j < keys.length; j++) {
          sendData["param" + count] = myLangMap[keys[j]];
          filterArray.push(myLangMap[keys[j]]);
          count++;
        }
        break;
      } else {
        sendData["param" + count] = myLangResult[i];
        filterArray.push(myLangResult[i]);
        count++;
      }
    }

    for (let i = 0; i < yourLangResult.length; i++) {
      if (yourLangResult[i] === "전체") {
        const keys = Object.keys(yourLangMap);
        for (let j = 1; j < keys.length; j++) {
          sendData["param" + count] = yourLangMap[keys[j]];
          filterArray.push(yourLangMap[keys[j]]);
          count++;
        }
        break;
      } else {
        sendData["param" + count] = yourLangResult[i];
        filterArray.push(yourLangResult[i]);
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
          <Title title="외국인 두리 만나기" />
          <InputBox onPress={(keyword) => handleInputBoxPress(keyword)} />

          <OptionName text={"내 언어"} />
          <Line />
          <CheckContainer>
            <CheckButton text="전체" onPress={() => handleMyLangButton(0)} />
            <CheckButton text="영어" onPress={() => handleMyLangButton(1)} />
            <CheckButton text="일본어" onPress={() => handleMyLangButton(2)} />
            <CheckButton text="중국어" onPress={() => handleMyLangButton(3)} />
            <CheckButton
              text="러시아어"
              onPress={() => handleMyLangButton(4)}
            />
            <CheckButton text="불어" onPress={() => handleMyLangButton(5)} />
            <CheckButton text="독일어" onPress={() => handleMyLangButton(6)} />
            <CheckButton text="한국어" onPress={() => handleMyLangButton(7)} />
            <CheckButton text="아랍어" onPress={() => handleMyLangButton(8)} />
          </CheckContainer>

          <OptionName text={"친구 언어"} />
          <Line />
          <CheckContainer>
            <CheckButton text="전체" onPress={() => handleYourLangButton(0)} />
            <CheckButton text="영어" onPress={() => handleYourLangButton(1)} />
            <CheckButton
              text="일본어"
              onPress={() => handleYourLangButton(2)}
            />
            <CheckButton
              text="중국어"
              onPress={() => handleYourLangButton(3)}
            />
            <CheckButton
              text="러시아어"
              onPress={() => handleYourLangButton(4)}
            />
            <CheckButton text="불어" onPress={() => handleYourLangButton(5)} />
            <CheckButton
              text="독일어"
              onPress={() => handleYourLangButton(6)}
            />
            <CheckButton
              text="한국어"
              onPress={() => handleYourLangButton(7)}
            />
            <CheckButton
              text="아랍어"
              onPress={() => handleYourLangButton(8)}
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

export default ForeignerSelect;
