import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.View``;
const ScoreText = styled.Text``;
const PointText = styled.Text`
  font-size: 20px;
`;

const UserScoreText = ({ score, point }) => {
  console.log(score);
  return (
    <Container>
      <ScoreText>{score}</ScoreText>
      <PointText>{point}</PointText>
    </Container>
  );
};

UserScoreText.propTypes = {
  score: PropTypes.string,
  point: PropTypes.number,
};
export default UserScoreText;
