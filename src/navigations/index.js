import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Search from "./Search";
import Auth from "./Auth";
import Room from "./Room";

const Navigation = () => {
  return (
    <NavigationContainer>
      {/* <Auth /> */}
      <Room />
      {/* <Search /> */}
    </NavigationContainer>
  );
};

export default Navigation;
