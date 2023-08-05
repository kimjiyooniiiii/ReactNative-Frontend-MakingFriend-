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
  color: ${({ theme }) => theme.listDescription};
`;
// font-weight: 600;
const ItemDesc = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listDescription};
`;
const ItemContent = styled.Text`
  font-size: 12px;
`;

// mentionUserId
const Review = ({
  review: { mentionUserNickname, content, mentionUserId },
}) => {
  return (
    <ItemContainer>
      <ItemTextContainer>
        <ItemDesc>{mentionUserNickname}</ItemDesc>
        <ItemDesc>(학번: {mentionUserId})</ItemDesc>
        <ItemContent>{content}</ItemContent>
      </ItemTextContainer>
    </ItemContainer>
  );
};
// const Review = ({ review: { opponentNickname, content, opponentId } }) => {
//   return (
//     <ItemContainer>
//       <ItemTextContainer>
//         <ItemDesc>{opponentNickname}</ItemDesc>
//         <ItemDesc>(학번: {opponentId})</ItemDesc>
//         <ItemContent>{content}</ItemContent>
//       </ItemTextContainer>
//     </ItemContainer>
//   );
// };
export default Review;
