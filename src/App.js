import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { StatusBar } from "react-native";
import Navigation from "./navigations";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Meal } from "./screens/search";

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar></StatusBar>
        <Meal />
        <Navigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

// const App = () => {
//   return (
//     <SafeAreaProvider>
//       <ThemeProvider theme={theme}>
//         <StatusBar>
//           <Meal />
//         </StatusBar>
//       </ThemeProvider>
//     </SafeAreaProvider>
//   );
// };

export default App;
