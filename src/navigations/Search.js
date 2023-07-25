import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MealSelect, MealResult } from "../screens/search/index";

const Stack = createStackNavigator();

const Search = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default Search;
