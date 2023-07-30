import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Chat, Side } from "../screens/chat";
import { Alert } from "react-native";

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

export default ChatDraw;
