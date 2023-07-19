import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Meal } from "../screens/search/index";

const Stack = createStackNavigator();

const Search = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Meal"
        component={Meal}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Search;