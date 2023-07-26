import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateRoom, MealSelect, MealResult, EnterRoom } from "../screens/room";

const Stack = createStackNavigator();

const Room = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateRoom"
        component={CreateRoom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MealSelect"
        component={MealSelect}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MealResult"
        component={MealResult}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EnterRoom"
        component={EnterRoom}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Room;
