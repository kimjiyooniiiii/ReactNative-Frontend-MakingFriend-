import React, { useEffect, useState, useContext, useMemo } from "react";
import styled from "styled-components/native";
import { FlatList, RefreshControl } from "react-native";
import { Item } from "../../components/common/ChatList";
import { FloatButton } from "../../components/common";
import { UserContext } from "../../contexts/User";
import { API_URL } from "@env";
//채팅방 이름 목록들
const List = styled.View`
  flex: 1;
`;

export const getInvolved = async (user) => {};

const ChatList = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [list, setList] = useState([]);
  const fetchItems = async () => {
    let response = await fetch(`${API_URL}/room/list/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    let items = await response.json();
    console.log(JSON.stringify(items));
    setList(items.data);
  };
  useEffect(() => {
    console.log(user);
    //목록 불러오기

    fetchItems();
    setIsRefreshing(false);
  }, []);
  // useMemo를 사용하여 list를 메모이제이션
  const memoizedList = useMemo(() => list, [list]);

  const handleRefresh = () => {
    setIsRefreshing(true); // 새로고침 시작 시 상태 변경
    fetchItems(); // 데이터 로드 함수 호출
    setIsRefreshing(false);
  };

  return (
    <List>
      <FlatList
        data={list}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => (
          <Item
            item={item}
            onPress={(params) =>
              navigation.navigate("EnterRoom", { data: params })
            }
          />
        )}
      />
      <FloatButton route="CreateRoom" />
    </List>
  );
};

export default ChatList;
