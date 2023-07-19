import React, { useState } from "react";
import { Platform, ImageBackground } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { timeBackground } from "../../assets/search";

const Container = styled.View`
  justify-content: center;
  padding: 10px;
`;

const SubContainer = styled.View`
  align-items: center;
  flex-direction: row;
  padding-bottom: 10px;
`;

const CustomButton = styled.TouchableOpacity`
  width: 100px;
  height: 50px;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: black;
  font-size: 16px;
`;

const DateText = styled.Text`
  color: black;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding-left: 10px;
`;

const DateTimePick = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(Platform.OS === "ios");
    setDate(currentTime);
  };
  console.log(date);

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  return (
    <Container>
      <SubContainer>
        <CustomButton onPress={showDatepicker}>
          <ImageBackground
            source={timeBackground}
            style={{
              flex: 1,
              justifyContent: "center",
              resizeMode: "contain",
            }}
          >
            <ButtonText style={{ textAlign: "center" }}>날짜 선택</ButtonText>
          </ImageBackground>
        </CustomButton>
        <DateText>
          {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
        </DateText>
      </SubContainer>

      <SubContainer>
        <CustomButton onPress={showTimepicker}>
          <ImageBackground
            source={timeBackground}
            style={{
              flex: 1,
              justifyContent: "center",
              resizeMode: "contain",
            }}
          >
            <ButtonText style={{ textAlign: "center" }}>시간 선택</ButtonText>
          </ImageBackground>
        </CustomButton>
        <DateText>
          {date.getHours()}시 {date.getMinutes()}분
        </DateText>
      </SubContainer>

      {showDatePicker && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </Container>
  );
};

export default DateTimePick;
