import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Meal } from "../screens";

const Stack = createStackNavigator();

const Search = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Meal" component={Meal} />
    </Stack.Navigator>
  );
};

export default Search;
