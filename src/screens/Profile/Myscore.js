import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
// import score1 from "./data/score1.json";
import { SafeAreaView, FlatList, Platform } from "react-native";
import { Review, UserScoreText } from "../../components/profile/review";
import { UserContext } from "../../contexts";
import { API_URL } from "@env";

const Container = styled.View`
  flex: 1;
`;
// background-color: ${({ theme }) => theme.background};

const Label = styled.Text`
  font-size: 18px;
  margin-bottom: 6px;
`;
// color: ${({ theme }) => theme.label};
// font-weight: bold;

const Myscore = () => {
  const [reviewList, setReviewList] = useState([]);

  // 기본값 설정해야댐
  const [score, setScore] = useState("");
  const [point, setPoint] = useState(0.0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`${API_URL}/user/info/score?userId=${user.userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res.data.opponentsMention);
        // console.log(JSON.stringify(res.data));
        setReviewList(res.data.opponentsMention);
        setScore(res.data.score);
        setPoint(res.data.point);
        // user1 = JSON.stringify(res.data);
        // console.log(user1);
      });
  }, [user.accessToken, user.userId]);
  // useEffect(() => {
  //   setReviewList(score1.data.opponents);
  // }, []);

  return (
    // <SafeAreaView>
    <Container>
      {/* <UserInfoText value={user1.nickName} isNickname={true} /> */}
      <UserScoreText score={score} point={point} />
      <Label>Reviews</Label>
      <FlatList
        data={reviewList}
        renderItem={({ item }) => <Review review={item} />}
        keyExtractor={(item) => item["mentionId"].toString()}
        windowSize={5}
      />
    </Container>
    // </SafeAreaView>
  );
};

export default Myscore;
