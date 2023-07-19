import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { clickButton, inputBoxImage } from "../../../assets/search";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 2px;
`;

const ImageContainer = styled.View`
  width: 250px;
  height: 35px;
  border-width: 2px;
  border-color: darkgrey;
  border-radius: 10px;
  overflow: hidden;
`;

const TextInput = styled.TextInput`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  margin-left: 3px;
`;

const ButtonImage = styled.Image`
  width: 50px;
  height: 50px;
`;

const InputBox = ({ onPress }) => {
  const [keyword, setKeyword] = useState("");

  const handleTextChange = (input) => {
    setKeyword(input);
  };

  const handle = () => {
    console.log("입력한 값:", keyword);
    onPress();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ImageContainer>
          <ImageBackground
            source={inputBoxImage}
            style={{
              flex: 1,
              resizeMode: "contain",
            }}
          >
            <TextInput value={keyword} onChangeText={handleTextChange} />
          </ImageBackground>
        </ImageContainer>
        <SubmitButton onPress={handle}>
          <ButtonImage source={clickButton} />
        </SubmitButton>
      </Container>
    </ThemeProvider>
  );
};

export default InputBox;
