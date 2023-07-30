import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./Auth";
import Room from "./Room";
import Profile from "./Profile";
import Board from "./Board";
import Main from "./Main";

const Navigation = () => {
  return (
    <NavigationContainer>
      {/* <Auth /> */}
      {/* <Room /> */}
      {/* <Profile /> */}
      {/* <Board/> */}
      <Main />
    </NavigationContainer>
  );
};

export default Navigation;
