import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import {
  Title,
  InputBox,
  CheckBox,
  OptionName,
  Line,
} from "../../components/search";
import { theme } from "./theme";
import { SafeAreaView } from "react-native-safe-area-context";

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

const Meal = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <Container>
          <Title title="밥 먹을 두리" />
          <InputBox />

          <OptionName text={"학식"} />
          <Line />
          <CheckContainer>
            <CheckBox text="전체" />
            <CheckBox text="천지" />
            <CheckBox text="크누" />
            <CheckBox text="기숙사" />
            <CheckBox text="백록" />
            <CheckBox text="석재" />
            <CheckBox text="기타" />
          </CheckContainer>

          <OptionName text={"외식"} />
          <Line />
          <CheckContainer>
            <CheckBox text="전체" />
            <CheckBox text="후문" />
            <CheckBox text="애막골" />
            <CheckBox text="정문" />
            <CheckBox text="명동" />
            <CheckBox text="기타" />
          </CheckContainer>

          <OptionName text={"메뉴"} />
          <Line />
          <CheckContainer>
            <CheckBox text="전체" />
            <CheckBox text="한식" />
            <CheckBox text="일식" />
            <CheckBox text="양식" />
            <CheckBox text="중식" />
            <CheckBox text="기타" />
          </CheckContainer>
        </Container>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default Meal;
