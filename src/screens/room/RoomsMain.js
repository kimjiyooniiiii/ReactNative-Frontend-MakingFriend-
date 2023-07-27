import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { Image, Dimensions, View } from "react-native";
import roomMain from "../../../assets/images/roomMain.png";
import { CategoryButton, MenuButton } from "../../components/roomMain";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const CategoryContainer = styled.View`
  background-color: ${({ theme }) => theme.menuBackground};
  padding: 15px 15px 15px 15px;
  margin: 30px 15px 15px 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const CategoryButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MenuButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 20px;
`;

const RoomsMain = () => {
  const windowWidth = Dimensions.get("window").width;
  const imageWidth = windowWidth * 0.8;
  const navigation = useNavigation();

  const navigateRoomSelect = (category) => {
    navigation.navigate(category);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Image
          source={roomMain}
          style={{ width: imageWidth, height: 120, resizeMode: "stretch" }}
        />
        <CategoryContainer>
          <View
            style={{
              width: imageWidth,
              height: 250,
            }}
          >
            <CategoryButtonContainer>
              <CategoryButton
                title="밥"
                onPress={() => navigateRoomSelect("MealSelect")}
              ></CategoryButton>
              <CategoryButton
                title="스터디"
                onPress={() => navigateRoomSelect("StudySelect")}
              ></CategoryButton>
            </CategoryButtonContainer>
            <CategoryButtonContainer>
              <CategoryButton
                title="외국인 친구"
                onPress={() => navigateRoomSelect("ForeignerSelect")}
              ></CategoryButton>
              <CategoryButton
                title="운동"
                onPress={() => navigateRoomSelect("ExerciseSelect")}
              ></CategoryButton>
            </CategoryButtonContainer>
          </View>
        </CategoryContainer>
        <MenuButtonContainer>
          <MenuButton title="홈"></MenuButton>
          <MenuButton title="게시판"></MenuButton>
          <MenuButton title="내정보"></MenuButton>
          <MenuButton title="채팅"></MenuButton>
        </MenuButtonContainer>
      </Container>
    </ThemeProvider>
  );
};

export default RoomsMain;
