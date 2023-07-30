import React, { useState, useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Main, ChatList, BoardList } from "../screens/main";
import Profile from "./Profile";
import Room from "./Room";

const Tab = createBottomTabNavigator(); //Tab 네비 생성

const Home = ({ navigation, route }) => {
  const theme = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="메인"
        component={Main}
        options={{
          tabBarIcon: () => <MaterialIcons name="home" size={26} />,
        }}
      />
      <Tab.Screen
        name="채팅"
        component={Room}
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