import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.listDescription};
`;
const ItemDesc = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listDescription};
`;
const ItemContent = styled.Text`
  font-size: 12px;
`;

const Review = ({ review: { opponent_nickname, content } }) => {
  return (
    <ItemContainer>
      <ItemTextContainer>
        <ItemDesc>{opponent_nickname}</ItemDesc>
        <ItemContent>{content}</ItemContent>
      </ItemTextContainer>
    </ItemContainer>
  );
};

export default Review;
