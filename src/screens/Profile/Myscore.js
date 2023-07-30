import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import score1 from "./data/score1.json";
import { SafeAreaView, FlatList, Platform } from "react-native";
import { Review, UserScoreText } from "../../components/profile/review";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Label = styled.Text`
  font-size: 18px;
  margin-bottom: 6px;
  font-weight: bold;
  color: ${({ theme }) => theme.label};
`;

const Myscore = () => {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    setReviewList(score1.data.opponents);
  }, []);
  return (
    // <SafeAreaView>
    <Container>
      {/* <UserInfoText value={user1.nickName} isNickname={true} /> */}
      <UserScoreText score={score1.data.score} point={score1.data.point} />
      <Label>Reviews</Label>
      <FlatList
        data={reviewList}
        renderItem={({ item }) => <Review review={item} />}
        keyExtractor={(item) => item["mention_id"].toString()}
        windowSize={5}
      />
    </Container>
    // </SafeAreaView>
  );
};

export default Myscore;
