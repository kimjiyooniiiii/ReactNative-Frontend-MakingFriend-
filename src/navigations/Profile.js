import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Mypage, Myscore, EditMypage } from "../screens/Profile/index";

const Stack = createStackNavigator();

const Profile = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mypage" component={Mypage} />
      <Stack.Screen name="Myscore" component={Myscore} />
      <Stack.Screen name="EditMypage" component={EditMypage} />
    </Stack.Navigator>
  );
};

export default Profile;
