import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CreateRoom,
  EnterRoom,
  RoomsMain,
  StudySearch,
  StudyResult,
  ExerciseSearch,
  ForeignerSearch,
  ForeignerResult,
  MealSearch,
  MealResult,
  HobbySearch,
  HobbyResult,
  TaxiSearch,
  TaxiResult,
  DeliverySearch,
  DeliveryResult,
} from "../screens/room";
import { ChatList, Chat } from "../screens/chat";

const Stack = createStackNavigator();

const Room = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateRoom"
        component={CreateRoom}
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
