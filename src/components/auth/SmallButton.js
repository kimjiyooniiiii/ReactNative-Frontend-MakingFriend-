import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.View`
  background-color: ${({ theme }) => theme.smallbutton};
  justify-content: center;
  border-radius: 4px;
`;

// opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

const Title = styled.Text`
  font-size: 16px;
`;

const SmallButton = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

SmallButton.propTypes = {
  title: PropTypes.string.isRequired,
  // onPress: PropTypes.func.isRequired,
  // containerStyle: PropTypes.object,
  // textStyle: PropTypes.object,
  // //   isFilled: PropTypes.bool,
  // disabled: PropTypes.bool,
};
export default SmallButton;
