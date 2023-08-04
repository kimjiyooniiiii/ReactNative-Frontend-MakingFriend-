import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Auth from "./Auth";
import Room from "./Room";
import Profile from "./Profile";
import BoardList from "./BoardList";
import Main from "./Main";

const Navigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Room />
      {/* <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={Auth}
          // options={{
          //   headerShown: false,
          // }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          // options={{
          //   headerShown: false,
          // }}
        />
  </Stack.Navigator> */}

      {/* <Profile /> */}
      {/* <BoardList /> */}
      {/* <Main /> */}
    </NavigationContainer>
  );
};

export default Navigation;
