import { okCheck, unCheck } from "../../../assets/search";
import React, { useState } from "react";
import { TouchableOpacity, ImageBackground, Text } from "react-native";
import styled from "styled-components/native";

const Button = styled(TouchableOpacity)`
  width: 100px;
  height: 40px;
`;

const ButtonText = styled(Text)`
  color: black;
  text-align: center;
  font-size: 16px;
`;

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = () => {
    setIsChecked(true);
    console.log("Button Pressed");
  };

  const buttonImage = isChecked ? unCheck : okCheck;

  return (
    <Button onPress={handlePress}>
      <ImageBackground
        source={buttonImage}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ButtonText>버튼</ButtonText>
      </ImageBackground>
    </Button>
  );
};

export default CheckBox;
