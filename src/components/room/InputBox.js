import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import React, { useState } from "react";

const Container = styled.View`
  flex-direction: row;
`;

const TextInput = styled.TextInput`
  background-color: ${({ theme }) => theme.box_color};
  height: ${({ height }) => height || 35}px;
  width: ${({ width }) => width || 250}px;
  border-radius: 10px;
`;

const InputBox = ({ height, width, placeholder }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          height={height}
          width={width}
          placeholder={placeholder}
          multiline
          numberOfLines={10} // 보여질 줄 수
        />
      </Container>
    </ThemeProvider>
  );
};

export default InputBox;
