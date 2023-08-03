import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CreateRoom,
  MealSelect,
  MealResult,
  EnterRoom,
  RoomsMain,
  StudySelect,
  ExerciseSelect,
  ForeignerSelect,
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
        name="RoomsMain"
        component={RoomsMain}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MealSelect"
        component={MealSelect}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="StudySelect"
        component={StudySelect}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ExerciseSelect"
        component={ExerciseSelect}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ForeignerSelect"
        component={ForeignerSelect}
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
