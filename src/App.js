import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { StatusBar } from "react-native";
import Navigation from "./navigations";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar></StatusBar>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
