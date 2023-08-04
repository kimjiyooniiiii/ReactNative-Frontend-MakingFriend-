import { InputBox, Title } from "../../components/room2";
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { API_URL } from "@env";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
  height: 100%;
`;

const TitleContainer = styled.View`
  justify-content: flex-start;
  padding: 0 20px;
`;

const InputBoxContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 0;
`;

const PreviewContainer = styled.View`
  background-color: ${({ theme }) => theme.preview_box};
  height: 70px;
  width: 90%;
  border-width: 2px;
  border-color: black;
  border-radius: 10px;
  align-self: center;
  margin: 0 0 10px 0;
  justify-content: center;
`;

const PostTitle = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  padding-left: 8px;
  padding-bottom: 3px;
`;

const FirstLineContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Date = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  padding-right: 8px;
  padding-bottom: 3px;
`;

const PostContent = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  padding-left: 8px;
`;

const HobbyResult = () => {
  const HobbyResultNavigation = useNavigation();
  const roomDetailsNavigation = useNavigation();
  const route = useRoute();
  const dataArray = route.params?.data;
  const sendData = [];

  // 방 내용 상세보기
  const roomDetails = (data) => {
    roomDetailsNavigation.navigate("EnterRoom", { data: data });
  };

  //다른 모임 방 다시 검색
  const searchAnotherRoom = (keyword) => {
    if (keyword !== "") {
      sendData.push(keyword);
    }

    const dataArray = []; // 백엔드에서 받은 결과들
    let data = {
      keywordList: sendData,
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
        HobbyResultNavigation.navigate("HobbyResult", {
          data: dataArray,
        });
        console.log("성공");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
        <Container>
          <TitleContainer>
            <Title title="취미 같이 할 두리" />
          </TitleContainer>
          <InputBoxContainer>
            <InputBox onPress={searchAnotherRoom} />
          </InputBoxContainer>

          {dataArray.map((data, index) => (
            <TouchableOpacity key={index} onPress={() => roomDetails(data)}>
              <PreviewContainer>
                <FirstLineContainer>
                  <PostTitle>{data.roomName}</PostTitle>
                  <Date>{data.createdDt}</Date>
                </FirstLineContainer>

                <PostContent>
                  {data.introduce.length > 20
                    ? `${data.introduce.slice(0, 20)}...`
                    : data.introduce}
                </PostContent>
              </PreviewContainer>
            </TouchableOpacity>
          ))}
        </Container>
      </KeyboardAwareScrollView>
    </ThemeProvider>
  );
};

export default HobbyResult;
