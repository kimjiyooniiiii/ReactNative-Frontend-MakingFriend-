import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
`;

const Title = styled.Text`
  font-size: 24px;
`;

const Button = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  // onPress: PropTypes.func.isRequired,
  // containerStyle: PropTypes.object,
  // textStyle: PropTypes.object,
  // //   isFilled: PropTypes.bool,
  // disabled: PropTypes.bool,
};
export default Button;
