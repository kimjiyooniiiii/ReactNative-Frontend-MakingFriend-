import React, { useContext } from "react";
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
import { Chat, Side } from "../screens/chat";
import { Alert } from "react-native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ChatDraw = ({ route }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Chat"
      drawerPosition="right"
      backBehavior="history"
    >
      <Drawer.Screen
        name="Chat"
        options={{ drawerLabel: "Chat" }}
        component={() => <Chat route={route} />} // 데이터를 전달하려면 컴포넌트를 함수로 감싸주고, 해당 함수의 인자로 route를 전달합니다.
      />
      <Drawer.Screen
        name="Side"
        options={{ drawerLabel: "Side" }}
        component={() => {
          Alert.alert("side!");
        }} // 다른 스크린들도 이와 같이 등록해줍니다.
      />
    </Drawer.Navigator>
  );
};

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
