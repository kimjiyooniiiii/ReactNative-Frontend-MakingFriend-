import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { Button } from "../../components/common";
import { FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
import { API_URL } from "@env";

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.border};
  padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ItemDesc = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.text};
`;

const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;
const ItemIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  name: "keyboard-arrow-right",
  size: 24,
  color: theme.itemIcon,
}))``;

// 목록 불러오기
export const Item = React.memo(
  ({ item: { id, roomName, introduce, createdDt, numbers }, onPress }) => {
    // console.log(roomName);

    return (
      <ItemContainer
        onPress={() => onPress({ id, roomName, introduce, createdDt, numbers })}
      >
        <ItemTextContainer>
          <ItemTitle>{roomName}</ItemTitle>
          <ItemDesc>{introduce}</ItemDesc>
        </ItemTextContainer>
        <ItemTime>{createdDt}</ItemTime>
        <ItemIcon />
      </ItemContainer>
    );
  },
);

export const getItems = async () => {
  try {
    let response = await fetch(`${API_URL}/room/searchByKeyword?천지`, {
      method: "GET",
    });
    let items = await response.json();
    // console.log(JSON.stringify(items));
    return items;
  } catch (e) {
    console.log(e.message);
  }
};
