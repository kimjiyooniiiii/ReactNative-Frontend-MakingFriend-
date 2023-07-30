import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import React, { useState } from "react";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 2px;
`;

const ImageContainer = styled.View`
  width: 300px;
  height: 35px;
  border-width: 2px;
  border-color: darkgrey;
  border-radius: 10px;
  overflow: hidden;
`;

const TextInput = styled.TextInput`
  background-color: ${({ theme }) => theme.box_color};
  flex: 1;
  height: 35px;
  width: 500px;
  padding: 0 0 0 10px;
  border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  margin-left: 3px;
`;

const ButtonImage = styled.Image`
  width: 60px;
  height: 60px;
`;

const InputBox = ({ onPress }) => {
  const [keyword, setKeyword] = useState("");

  const handleTextChange = (input) => {
    setKeyword(input);
  };

  const handle = () => {
    onPress(keyword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ImageContainer>
          <TextInput value={keyword} onChangeText={handleTextChange} />
        </ImageContainer>
        <SubmitButton onPress={handle}>
          <ButtonImage
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/rudoori.appspot.com/o/search%2FclickButton.png?alt=media",
            }}
          />
        </SubmitButton>
      </Container>
    </ThemeProvider>
  );
};

export default InputBox;
