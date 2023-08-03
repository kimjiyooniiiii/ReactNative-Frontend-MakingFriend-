import React from "react";
import "react-native-gesture-handler";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { StatusBar, SafeAreaView } from "react-native";
import Navigation from "./navigations";
import { SelectProvider } from "./context/SelectContext";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SelectProvider>
        {/* // 기존에 사용한 useSafeAreaInsets는 화면 회전시 성능이 저하된다고 하여 더
      안전한 것으로 대체함 */}
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: theme.background,
          }}
        >
          <StatusBar />
          <Navigation />
        </SafeAreaView>
      </SelectProvider>
    </ThemeProvider>
  );
};

export default App;
