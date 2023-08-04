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
        name="EnterRoom"
        component={EnterRoom}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Room;
