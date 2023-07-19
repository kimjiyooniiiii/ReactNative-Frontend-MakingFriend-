import { okCheck, unCheck } from "../../../assets/search";
import React, { useState } from "react";
import { TouchableOpacity, ImageBackground, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 8px;
`;

const Button = styled(TouchableOpacity)`
  width: 70px;
  height: 30px;
`;

const ButtonText = styled(Text)`
  color: black;
  text-align: center;
  font-size: 13px;
`;

const CheckButton = ({ text, onPress }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = () => {
    setIsChecked(!isChecked);
    onPress();
  };

  const buttonImage = isChecked ? unCheck : okCheck;

  return (
    <Container>
      <Button onPress={handlePress}>
        <ImageBackground
          source={buttonImage}
          style={{
            flex: 1,
            justifyContent: "center",
            //alignItems: "center",
            resizeMode: "contain",
          }}
        >
          <ButtonText>{text}</ButtonText>
        </ImageBackground>
      </Button>
    </Container>
  );
};

export default CheckButton;
