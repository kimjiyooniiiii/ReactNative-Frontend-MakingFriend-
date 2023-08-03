import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
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
  const [list, setList] = useState([]);
  useEffect(() => {
    console.log(user);
    //목록 불러오기
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
    fetchItems();
  }, []);

  return (
    <List>
      <FlatList
        data={list}
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
