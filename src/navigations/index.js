import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Search from "./Search";
import Auth from "./Auth";
import Room from "./Room";
import Profile from "./Profile";

const Navigation = () => {
  return (
    <NavigationContainer>
      {/* <Auth /> */}
      <Room />
      {/* <Search /> */}
      {/* <Profile />*/}
    </NavigationContainer>
  );
};

export default Navigation;
