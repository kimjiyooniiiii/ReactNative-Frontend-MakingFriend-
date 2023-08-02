import React, { useState, useContext, useRef } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";
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
import ChatDraw from "./ChatDraw";

const Stack = createStackNavigator();

const Main = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: theme.text,
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: theme.background },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="EnterRoom" component={EnterRoom} />
      <Stack.Screen
        name="Chat"
        component={ChatDraw}
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
    </Stack.Navigator>
  );
};

export default Main;
