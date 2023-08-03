import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./Auth";
import Room from "./Room";
import Profile from "./Profile";
import Main from "./Main";

const Navigation = () => {
  return (
    <NavigationContainer>
      {/* <Auth />*/}
      {/* <Room /> */}
      {/* <Profile />*/}
      <Main />
    </NavigationContainer>
  );
};

export default Navigation;
