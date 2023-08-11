import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import moment from "moment";

/**
 * {"_id": "13bfc100-6ae1-463f-a87c-0f0a878aa892",
 * "blockedMember": [],
 * "createdAt": "2023-08-04T23:00:17.823",
 * "full": false,
 * "introduce": "test1",
 * "maxParticipants": 2,
 * "participants": ["201415555"],
 * "roomName": "Test1"}
 */
// 목록 불러오기
export const Item = React.memo(
  ({
    item: {
      _id,
      roomName,
      introduce,
      createdAt,
      maxParticipants,
      hostUser,
      full,
      blockedMember,
      participants,
    },
    onPress,
  }) => {
    const now = moment();
    const date = moment(createdAt);
    const formattedTime = now.isSame(date, "day")
      ? date.format("HH:mm")
      : date.format("YYYY년 MM월 DD일");
    return (
      <ItemContainer
        onPress={() =>
          onPress({
            _id,
            roomName,
            introduce,
            createdAt,
            maxParticipants,
            full,
            hostUser,
            blockedMember,
            participants,
          })
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

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border: 2px;
  border-color: ${({ theme }) => theme.border};
  border-radius: 15px;
  padding: 15px 20px;
  margin-bottom: 50px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  /* border: 2px; */
  flex-direction: column;
  /* border-radius: 10px; */
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
