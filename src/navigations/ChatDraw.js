import React, { useState, useRef, useEffect } from "react";
import { Chat, Side } from "../screens/chat";

import styled from "styled-components/native";
import { Text, Animated } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const Drawer = styled(Animated.View)`
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 100%;
  background-color: #f0f0f0;
  padding: 20px;
`;

const DrawerItem = styled.TouchableOpacity`
  margin-bottom: 10px;
`;

const DrawerButton = styled.TouchableOpacity`
  position: absolute;
  /* bottom: 20px; */
  top: 10px;
  right: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

const ChatDraw = ({ route }) => {
  useEffect(() => {});
  console.log("chatdraw : ", route);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer가 처음에 닫혀있도록 상태 설정
  const drawerAnimation = useRef(new Animated.Value(0)).current; // 초기값도 0으로 설정

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      // Drawer가 열려있는 상태에서 닫기 버튼 클릭 시
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsDrawerOpen(false)); // 애니메이션이 끝나면 Drawer 상태를 닫힌 상태로 업데이트
    } else {
      // Drawer가 닫혀있는 상태에서 열기 버튼 클릭 시
      setIsDrawerOpen(true); // Drawer 상태를 열린 상태로 업데이트
      Animated.timing(drawerAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0], // Drawer가 닫혀있는 상태(0)에서 열린 상태(1)로 이동하면서 오른쪽으로 이동
  });

  return (
    <Container>
      <Chat route={route} />
      <Drawer style={{ transform: [{ translateX: drawerTranslateX }] }}>
        <DrawerItem onPress={toggleDrawer}>
          <Text>메뉴 항목 1</Text>
        </DrawerItem>
        <DrawerItem onPress={toggleDrawer}>
          <Text>메뉴 항목 2</Text>
        </DrawerItem>
        <DrawerItem onPress={toggleDrawer}>
          <Text>메뉴 항목 3</Text>
        </DrawerItem>
      </Drawer>
      <DrawerButton onPress={toggleDrawer}>
        <Text>{isDrawerOpen ? "닫기" : "열기"}</Text>
      </DrawerButton>
    </Container>
  );
};

export default ChatDraw;
