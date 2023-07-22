import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Search from "./Search";
import Auth from "./Auth";

const Navigation = () => {
  return (
    <NavigationContainer>
      {/* <Search /> */}
      <Auth />
    </NavigationContainer>
  );
};

export default Navigation;
