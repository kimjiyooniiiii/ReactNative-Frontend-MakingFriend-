import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Search from "./Search";
import Auth from "./Auth";
import Profile from "./Profile";

const Navigation = () => {
  return (
    <NavigationContainer>
      {/* <Search /> */}
      {/* <Auth /> */}
      <Profile />
    </NavigationContainer>
  );
};

export default Navigation;
