import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Button, FloatButton } from "../../components/common";
import { FlatList, RefreshControl } from "react-native";
import { ThemeContext } from "styled-components/native";
import { Item } from "../../components/common/ChatList";
import { LOGO } from "@env";
import { getListInfo, initRoomInfo } from "../../redux/slice/chatSlice";
import { useSelector, useDispatch } from "react-redux";

// 메인페이지
const Container = styled.View`
  background: white;
  flex: 1;
`;

//로고 이미지
const Logo = styled.Image`
  height: 100%;
`;

//채팅방 태그
const Category = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 20%;
`;

//채팅방 이름 목록들
const ChatList = styled.View`
  flex: 1;
`;

const Main = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chat.chatList);

  // //목록 불러오기
  const fetchItems = () => {
    dispatch(getListInfo()); // getListInfo 액션을 디스패치하여 채팅방 리스트 데이터 불러오기
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    fetchItems();
    setIsRefreshing(false);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true); // 새로고침 시작 시 상태 변경
    fetchItems(); // 데이터 로드 함수 호출
    setIsRefreshing(false);
  };

  return (
    <Container>
      <Category>
        <Logo
          source={{
            uri: `${LOGO}`,
          }}
          style={{ width: 80, height: 50, resizeMode: "contain" }}
        />
        <Button title="밥" onPress={() => navigation.navigate("MealSearch")} />
        <Button
          title="스터디"
          onPress={() => navigation.navigate("StudySearch")}
        />
        <Button
          title="배달"
          onPress={() => navigation.navigate("DeliverySearch")}
        />
        <Button
          title="택시"
          onPress={() => navigation.navigate("TaxiSearch")}
        />
        <Button
          title="외국인"
          onPress={() => navigation.navigate("ForeignerSearch")}
        />
        <Button
          title="운동"
          onPress={() => navigation.navigate("ExerciseSearch")}
        />
      </Category>

      <ChatList>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          data={chatList}
          renderItem={({ item }) => (
            <Item
              item={item}
              onPress={(param) => {
                navigation.navigate("EnterRoom");
                dispatch(initRoomInfo(param));
              }}
            />
          )}
        />
        <FloatButton route="CreateRoom" />
      </ChatList>
    </Container>
  );
};

export default Main;
