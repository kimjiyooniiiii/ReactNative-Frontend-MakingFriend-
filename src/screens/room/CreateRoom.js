import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { InputBox, SubmitButton } from "../../components/room";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const TitleContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px 10px 30px 10px;
`;

const Title = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  font-size: 25px;
  padding: 0 0 40px 0;
`;

const SubTitle = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
`;

const InputContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 10px 0px 30px;
`;

const ContentContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 10px 0px 30px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 60px 20px 0px 0px;
`;

const CreateRoom = () => {
  const category = ["공부", "밥", "운동", "택시"];
  const [categorySelect, setCategorySelect] = useState("");

  const handleCategorySelect = (option) => {
    setCategorySelect(option);
  };

  const members = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [membersSelect, setMembersSelect] = useState();

  const handleMembersSelect = (option) => {
    setMembersSelect(option);
  };

  const handleButtonPress = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TitleContainer>
          <Title>방 만들기</Title>
        </TitleContainer>
        <InputContainer>
          <SubTitle>방 이름 : </SubTitle>
          <InputBox></InputBox>
        </InputContainer>
        <InputContainer>
          <SubTitle>인원 수 : </SubTitle>
          <SelectDropdown
            data={members}
            onSelect={handleMembersSelect}
            buttonStyle={{
              backgroundColor: "#A2E1DB", // 버튼 배경색
              borderRadius: 8, // 버튼 테두리의 둥근 정도
              height: 35,
              width: 250,
            }}
            renderCustomizedButtonChild={() => (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Icon name="caret-down" size={35} color="black" />
              </View>
            )}
          ></SelectDropdown>
        </InputContainer>
        <InputContainer>
          <SubTitle>{"주    제  : "}</SubTitle>
          <SelectDropdown
            data={category}
            onSelect={handleCategorySelect}
            buttonStyle={{
              backgroundColor: "#A2E1DB", // 버튼 배경색
              borderRadius: 8, // 버튼 테두리의 둥근 정도
              height: 35,
              width: 250,
            }}
            renderCustomizedButtonChild={() => (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Icon name="caret-down" size={35} color="black" />
              </View>
            )}
          ></SelectDropdown>
        </InputContainer>
        <ContentContainer>
          <InputBox
            height={300}
            width={330}
            placeholder="  공지사항을 작성해주세요"
          ></InputBox>
        </ContentContainer>
        <ButtonContainer>
          <SubmitButton onPress={handleButtonPress} title="완료" />
        </ButtonContainer>
      </Container>
    </SafeAreaView>
  );
};

export default CreateRoom;
