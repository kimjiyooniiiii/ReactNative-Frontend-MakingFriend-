import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens/auth/index";

const Stack = createStackNavigator();

const Auth = () => {
  // console.log("navigations/Auth.js 접근");
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Auth;
