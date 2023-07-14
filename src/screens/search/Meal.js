import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "./../../theme";

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
`;

const Meal = () => {
  return (
    //  기존에 사용한 useSafeAreaInsets는 화면 회전시 성능이 저하된다고 하여 더 안전한 것으로 대체함
    <SafeAreaView>
      <Container></Container>
    </SafeAreaView>
  );
};

export default Meal;
