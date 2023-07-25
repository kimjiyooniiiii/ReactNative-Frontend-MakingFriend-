import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateRoom } from "../screens/room";

const Stack = createStackNavigator();

const Room = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateRoom"
        component={CreateRoom}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Room;
