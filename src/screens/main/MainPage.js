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
  background: ${({ theme }) => theme.mainBackground};
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
  const userId = useSelector((state) => state.user.userId);

  //내가 작성한 게시물 안보이기
  result = chatList.reduce((acc, cur) => {
    if (cur.hostUser !== userId) acc.push(cur);
    return acc;
  }, []);

  // console.log(result);
  // result = [
  //   {
  //     _id: "b36f849d-532c-4835-8839-e8a1a6fdfd59",
  //     blockedMember: [],
  //     createdAt: "2023-08-06T11:11:16.602",
  //     full: false,
  //     hostUser: "200000000",
  //     introduce: "testtttttt",
  //     maxParticipants: 2,
  //     participants: [[Object], [Object]],
  //     roomName: "Test",
  //   },
  //   {
  //     _id: "b36f849d-532c-4835-8839-e8a1a6fdfd59",
  //     blockedMember: [],
  //     createdAt: "2023-08-06T11:11:16.602",
  //     full: false,
  //     hostUser: "200000000",
  //     introduce: "testtttttt",
  //     maxParticipants: 2,
  //     participants: [[Object], [Object]],
  //     roomName: "Test",
  //   },
  //   {
  //     _id: "b36f849d-532c-4835-8839-e8a1a6fdfd59",
  //     blockedMember: [],
  //     createdAt: "2023-08-06T11:11:16.602",
  //     full: false,
  //     hostUser: "200000000",
  //     introduce: "testtttttt",
  //     maxParticipants: 2,
  //     participants: [[Object], [Object]],
  //     roomName: "Test",
  //   },
  //   {
  //     _id: "b36f849d-532c-4835-8839-e8a1a6fdfd59",
  //     blockedMember: [],
  //     createdAt: "2023-08-06T11:11:16.602",
  //     full: false,
  //     hostUser: "200000000",
  //     introduce: "testtttttt",
  //     maxParticipants: 2,
  //     participants: [[Object], [Object]],
  //     roomName: "Test",
  //   },
  //   {
  //     _id: "b36f849d-532c-4835-8839-e8a1a6fdfd59",
  //     blockedMember: [],
  //     createdAt: "2023-08-06T11:11:16.602",
  //     full: false,
  //     hostUser: "200000000",
  //     introduce: "testtttttt",
  //     maxParticipants: 2,
  //     participants: [[Object], [Object]],
  //     roomName: "Test",
  //   },
  //   {
  //     _id: "b36f849d-532c-4835-8839-e8a1a6fdfd59",
  //     blockedMember: [],
  //     createdAt: "2023-08-06T11:11:16.602",
  //     full: false,
  //     hostUser: "200000000",
  //     introduce: "testtttttt",
  //     maxParticipants: 2,
  //     participants: [[Object], [Object]],
  //     roomName: "Test",
  //   },
  // ];
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
          data={result}
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
