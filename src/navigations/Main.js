import React, { useState, useContext, useRef } from "react";
import { ThemeContext } from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home";
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
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateRoom"
        component={CreateRoom}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="RoomsMain"
        component={RoomsMain}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="MealResult"
        component={MealResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StudyResult"
        component={StudyResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryResult"
        component={DeliveryResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForeignerResult"
        component={ForeignerResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HobbyResult"
        component={HobbyResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TaxiResult"
        component={TaxiResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RoomsMain"
        component={RoomsMain}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TaxiSearch"
        component={TaxiSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HobbySearch"
        component={HobbySearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForeignerSearch"
        component={ForeignerSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliverySearch"
        component={DeliverySearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StudySearch"
        component={StudySearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MealSearch"
        component={MealSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExerciseSearch"
        component={ExerciseSearch}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Main;
