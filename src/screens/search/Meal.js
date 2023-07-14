import React from "react";
import styled from "styled-components/native";
import { Title } from "../../components/search";
import { theme } from "./../../theme";

const Container = styled.View`
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
`;

const Meal = () => {
  return (
    <Container>
      <Title />
    </Container>
  );
};

export default Meal;
