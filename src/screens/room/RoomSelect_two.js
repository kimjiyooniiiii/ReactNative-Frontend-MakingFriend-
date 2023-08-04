import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import { Title, InputBox, OptionName, Line } from "../../components/room2";
import { theme } from "./theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

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

const ButtonContainer = styled.View`
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 8px;
  margin: 2px 2px 2px 2px;
`;

const Button = styled(TouchableOpacity)`
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.checkedColor : theme.uncheckedColor};
  width: 100px;
  height: 50px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled(Text)`
  color: black;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const RoomSelect_two = ({ oneMenu, twoMenu, title, one, two, navi }) => {
  const [firstSelector, setFirstSelector] = oneMenu;
  const [secondSelector, setSecondSelector] = twoMenu;
  const navigation = useNavigation();

  // 검색할 키워드 저장 자료구조
  const [sendData, setSendData] = useState(new Set());

  const addSendData = (key, value, arrayName, setName) => {
    //버튼이 안 눌린 상태면
    if (!value) {
      if (key === "전체") {
        // 모든 키워드 "체크"된 상태로 바꾸기
        const allChecked = {};
        for (const [k, v] of Object.entries(arrayName)) {
          allChecked[k] = true;
        }
        setName(allChecked);

        // 전체를 제외한 모든 데이터 sendData에 넣기
        const filteredArray = Object.keys(arrayName).filter(
          (element) => element !== "전체",
        );

        filteredArray.forEach((i) => {
          setSendData(new Set(sendData.add(i)));
        });
      }
      // 하나의 키워드를 선택할 때
      else {
        setSendData(new Set(sendData.add(key)));
        setName({ ...arrayName, [key]: true });
      }
    }
    //버튼이 눌린 상태면
    else {
      if (key === "전체") {
        // 모든 키워드 "체크 해제"된 상태로 바꾸기
        const allChecked = {};
        for (const [k, v] of Object.entries(arrayName)) {
          allChecked[k] = false;
        }
        setName(allChecked);

        // 모든 데이터 sendData에서 빼기
        const filteredArray = [...sendData].filter(
          (key) => !arrayName.hasOwnProperty(key),
        );
        setSendData(new Set(filteredArray));
      }
      // 하나의 키워드를 해제할 때
      else {
        sendData.delete(key);
        setSendData(new Set(sendData));
        setName({ ...arrayName, [key]: false });
      }
    }
  };

  // 검색 완료 -> 백엔드로 데이터 보냄
  const handleSendButton = (inputBoxKeyword) => {
    if (inputBoxKeyword !== "") {
      sendData.add(inputBoxKeyword);
      setSendData(new Set(sendData));
    }

    const array = Array.from(sendData);
    const dataArray = []; // 방 리스트 보여주는 스크린으로 보내는 데이터
    let data = {
      keywordList: array,
    };

    const send = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`${API_URL}/room/searchRoom`, send)
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
        console.log(dataArray);
        navigation.navigate(navi, { data: dataArray });
        console.log("성공");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log("보낼 데이터 : ", sendData);
  }, [sendData]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <Container>
          <Title title={title} />
          <InputBox
            onPress={(inputBoxKeyword) => handleSendButton(inputBoxKeyword)}
          />
          <OptionName text={one} />
          <Line />
          <CheckContainer>
            {Object.entries(firstSelector).map(([key, value]) => (
              <ButtonContainer>
                <Button
                  isChecked={value}
                  onPress={() =>
                    addSendData(key, value, firstSelector, setFirstSelector)
                  }
                >
                  <ButtonText>{key}</ButtonText>
                </Button>
              </ButtonContainer>
            ))}
          </CheckContainer>
          <OptionName text={two} />
          <Line />
          <CheckContainer>
            {Object.entries(secondSelector).map(([key, value]) => (
              <ButtonContainer>
                <Button
                  isChecked={value}
                  onPress={() =>
                    addSendData(key, value, secondSelector, setSecondSelector)
                  }
                >
                  <ButtonText>{key}</ButtonText>
                </Button>
              </ButtonContainer>
            ))}
          </CheckContainer>
        </Container>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default RoomSelect_two;
