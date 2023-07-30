import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { getItems, Item } from "../../components/common/ChatList";

//채팅방 이름 목록들
const List = styled.View`
  flex: 1;
`;

const ChatList = ({ navigation }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    //목록 불러오기
    const fetchItems = async () => {
      try {
        const items = await getItems(); // getItems 함수를 실행하여 아이템들을 가져옴
        setList(items); // 가져온 아이템들을 list 배열 상태로 업데이트
      } catch (e) {
        console.log(e.message);
      }
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
    </List>
  );
};

export default ChatList;
