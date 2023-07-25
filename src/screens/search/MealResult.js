import { InputBox, Title, PostPreview } from "../../components/search";
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
  height: 100%;
`;

const TitleContainer = styled.View`
  justify-content: flex-start;
  padding: 0 20px;
`;

const InputBoxContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 0;
`;

const PreviewContainer = styled.View`
  background-color: ${({ theme }) => theme.preview_box};
  height: 70px;
  width: 90%;
  border-width: 2px;
  border-color: black;
  border-radius: 10px;
  align-self: center;
  margin: 0 0 10px 0;
  justify-content: center;
`;

const PostTitle = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  padding-left: 8px;
  padding-bottom: 3px;
`;

const PostContent = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  padding-left: 8px;
`;

const MealResult = () => {
  const route = useRoute();
  const dataArray = route.params?.data;

  console.log(dataArray);

  return (
    <ThemeProvider theme={theme}>
      <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
        <Container>
          <TitleContainer>
            <Title title="밥 먹을 두리" />
          </TitleContainer>
          <InputBoxContainer>
            <InputBox />
          </InputBoxContainer>

          {dataArray.map((data, index) => (
            <PreviewContainer key={index}>
              <PostTitle>{data.title}</PostTitle>
              <PostContent>
                {data.content.length > 20
                  ? `${data.content.slice(0, 20)}...`
                  : data.content}
              </PostContent>
            </PreviewContainer>
          ))}
        </Container>
      </KeyboardAwareScrollView>
    </ThemeProvider>
  );
};

export default MealResult;
