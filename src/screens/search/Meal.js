import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { Title, InputBox, CheckBox } from "../../components/search";
import { theme } from "./theme";

const Container = styled.View`
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  flex: 1;
`;

const Meal = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title title="밥 먹을 두리" />
        <InputBox />
        <CheckBox title="크누" />
      </Container>
    </ThemeProvider>
  );
};

export default Meal;
