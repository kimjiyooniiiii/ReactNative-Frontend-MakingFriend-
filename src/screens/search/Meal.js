import React from "react";
import styled from "styled-components/native";
import { theme } from "../../theme";

const Container = styled.View`
  flex: 1;
  justify-content: left;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
`;

const Meal = () => {
  return <Container></Container>;
};

export default Meal;
