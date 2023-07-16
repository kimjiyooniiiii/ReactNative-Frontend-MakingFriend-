import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import React, { useState } from "react";
import { clickButton } from "../../../assets/search";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 2px;
`;

const TextInput = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.box_color};
  padding: 10px;
  height: 40px;
  border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  margin-left: 3px;
`;

const ButtonImage = styled.Image`
  width: 50px;
  height: 50px;
`;

const InputBox = () => {
  const [keyword, setKeyword] = useState("");

  const handleTextChange = (input) => {
    setKeyword(input);
  };

  const handle = () => {
    console.log("입력한 값:", keyword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TextInput value={keyword} onChangeText={handleTextChange} />
        <SubmitButton onPress={handle}>
          <ButtonImage source={clickButton} />
        </SubmitButton>
      </Container>
    </ThemeProvider>
  );
};

export default InputBox;
