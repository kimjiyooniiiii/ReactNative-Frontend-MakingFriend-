import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.View`
  background-color: ${({ theme }) => theme.bigbutton};
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
`;

// opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

const Title = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.white};
`;

const BigButton = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

BigButton.propTypes = {
  title: PropTypes.string.isRequired,
  // onPress: PropTypes.func.isRequired,
  // containerStyle: PropTypes.object,
  // textStyle: PropTypes.object,
  // //   isFilled: PropTypes.bool,
  // disabled: PropTypes.bool,
};
export default BigButton;
