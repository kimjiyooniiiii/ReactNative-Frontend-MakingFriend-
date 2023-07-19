import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import {
  Title,
  InputBox,
  CheckButton,
  OptionName,
  Line,
} from "../../components/search";
import { theme } from "./theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { DateTimePick } from "../../components";

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

const TimeContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  margin: 5px;
`;

const Meal = () => {
  const [schoolFoodStates, setSchoolFoodStates] = useState(
    Array(7).fill(false),
  );

  // 학식 종류들 선택시 결과값(boolean) 배열에 저장
  const handleSchoolFoodButton = (index) => {
    setSchoolFoodStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  const [outFoodStates, setOutFoodStates] = useState(Array(6).fill(false));

  // 외식 종류들 선택시 결과값(boolean) 배열에 저장
  const handleOutFoodButton = (index) => {
    setOutFoodStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  const [menuStates, setMenuStates] = useState(Array(6).fill(false));

  // 음식메뉴 종류들 선택시 결과값(boolean) 배열에 저장
  const handleMenuButton = (index) => {
    setMenuStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !prevStates[index];
      return newStates;
    });
  };

  const handleInputBoxPress = () => {
    const selectedSchoolFood = schoolFoodStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    const selectedOutFood = outFoodStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    const selectedMenu = menuStates
      .map((state, index) => ({ checked: state, index }))
      .filter((item) => item.checked)
      .map((item) => item.index);

    console.log("Selected School Food:", selectedSchoolFood);
    console.log("Selected Out Food:", selectedOutFood);
    console.log("Selected Menu:", selectedMenu);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <Container>
          <Title title="밥 먹을 두리" />
          <InputBox onPress={handleInputBoxPress} />

          <OptionName text={"학식"} />
          <Line />
          <CheckContainer>
            <CheckButton
              text="전체"
              onPress={() => handleSchoolFoodButton(0)}
            />
            <CheckButton
              text="천지"
              onPress={() => handleSchoolFoodButton(1)}
            />
            <CheckButton
              text="크누"
              onPress={() => handleSchoolFoodButton(2)}
            />
            <CheckButton
              text="기숙사"
              onPress={() => handleSchoolFoodButton(3)}
            />
            <CheckButton
              text="백록"
              onPress={() => handleSchoolFoodButton(4)}
            />
            <CheckButton
              text="석재"
              onPress={() => handleSchoolFoodButton(5)}
            />
            <CheckButton
              text="기타"
              onPress={() => handleSchoolFoodButton(6)}
            />
          </CheckContainer>

          <OptionName text={"외식"} />
          <Line />
          <CheckContainer>
            <CheckButton text="전체" onPress={() => handleOutFoodButton(0)} />
            <CheckButton text="후문" onPress={() => handleOutFoodButton(1)} />
            <CheckButton text="애막골" onPress={() => handleOutFoodButton(2)} />
            <CheckButton text="정문" onPress={() => handleOutFoodButton(3)} />
            <CheckButton text="명동" onPress={() => handleOutFoodButton(4)} />
            <CheckButton text="기타" onPress={() => handleOutFoodButton(5)} />
          </CheckContainer>

          <OptionName text={"메뉴"} />
          <Line />
          <CheckContainer>
            <CheckButton text="전체" onPress={() => handleMenuButton(0)} />
            <CheckButton text="한식" onPress={() => handleMenuButton(1)} />
            <CheckButton text="일식" onPress={() => handleMenuButton(2)} />
            <CheckButton text="양식" onPress={() => handleMenuButton(3)} />
            <CheckButton text="중식" onPress={() => handleMenuButton(4)} />
            <CheckButton text="기타" onPress={() => handleMenuButton(5)} />
          </CheckContainer>

          <TimeContainer>
            <OptionName text={"시간설정"} />
            <Line />
            <DateTimePick />
          </TimeContainer>
        </Container>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default Meal;
