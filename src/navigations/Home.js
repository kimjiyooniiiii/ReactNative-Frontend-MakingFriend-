import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Main, ChatList, BoardList, Profile } from "../screens/main";

const Tab = createBottomTabNavigator(); //Tab 네비 생성

const Home = ({ navigation, route }) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="메인"
        component={Main}
        options={{
          tabBarIcon: () => <MaterialIcons name="home" size={26} />,
        }}
      />
      <Tab.Screen
        name="채팅"
        component={ChatList}
        options={{
          tabBarIcon: () => <MaterialIcons name="chat-bubble" size={26} />,
        }}
      />
      <Tab.Screen
        name="게시판"
        component={BoardList}
        options={{
          tabBarIcon: () => <MaterialIcons name="dashboard" size={26} />,
        }}
      />
      <Tab.Screen
        name="내정보"
        component={Profile}
        options={{
          tabBarIcon: () => <MaterialIcons name="person" size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
