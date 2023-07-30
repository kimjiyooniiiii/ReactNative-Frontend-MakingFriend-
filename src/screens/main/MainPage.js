import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Button } from "../../components/common";
import { FlatList } from "react-native";
import { ThemeContext } from "styled-components/native";
import { getItems, Item } from "../../components/common/ChatList";
import { LOGO } from "@env";

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
  const [list, setList] = useState([]); //메인 페이지에 보일 리스트

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
    <Container>
      <Category>
        <Logo
          source={{
            uri: `${LOGO}`,
          }}
          style={{ width: 80, height: 50, resizeMode: "contain" }}
        />
        <Button title="밥" onPress={() => {}} />
        <Button title="간식" onPress={() => {}} />
        <Button title="스터디" onPress={() => {}} />
        <Button title="배달" onPress={() => {}} />
        <Button title="택시" onPress={() => {}} />
        <Button title="외국인" onPress={() => {}} />
        <Button title="운동" onPress={() => {}} />
        <Button title="기타" onPress={() => {}} />
      </Category>

      <ChatList>
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
      </ChatList>
    </Container>
  );
};

export default Main;