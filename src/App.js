import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { StatusBar } from "react-native";
import Navigation from "./navigations";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  return (
    //  기존에 사용한 useSafeAreaInsets는 화면 회전시 성능이 저하된다고 하여 더 안전한 것으로 대체함
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar></StatusBar>
        <Navigation />
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;
