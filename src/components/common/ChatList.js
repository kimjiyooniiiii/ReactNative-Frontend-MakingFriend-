import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";
import { API_URL } from "@env";
import moment from "moment";

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
  ({
    item: { _id, roomName, introduce, createdAt, maxParticipants },
    onPress,
  }) => {
    console.log(roomName);
    const now = moment();
    const date = moment(createdAt);
    const formattedTime = now.isSame(date, "day")
      ? date.format("HH:mm")
      : date.format("YYYY년 MM월 DD일");
    return (
      <ItemContainer
        onPress={() =>
          onPress({ _id, roomName, introduce, formattedTime, maxParticipants })
        }
      >
        <ItemTextContainer>
          <ItemTitle>{roomName}</ItemTitle>
          <ItemDesc>{introduce}</ItemDesc>
        </ItemTextContainer>
        <ItemTime>{formattedTime}</ItemTime>
        <ItemIcon />
      </ItemContainer>
    );
  },
);

export const getItems = async () => {
  try {
    let response = await fetch(`${API_URL}/room/list`, {
      method: "GET",
    });
    let items = await response.json();
    // console.log(JSON.stringify(items));
    return items;
  } catch (e) {
    // console.log(e.message);
  }
};

/**
 * {"status":"success",
 * "data":[{"_id":"64ca881765ac452b4f385d85","roomName":"천지관에서서","introduce":"밥먹어요","participants":["201234567"],"maxParticipants":5,"blockedMember":[],"createdAt":"2023-08-03T01:45:11.82","full":false},{"_id":"64ca887d65ac452b4f385d86","roomName":"치킨먹을사람","introduce":"여기모여라","participants":["201234567"],"maxParticipants":3,"blockedMember":[],"createdAt":"2023-08-03T01:46:53.815","full":false}],"message":"200"}
 */
