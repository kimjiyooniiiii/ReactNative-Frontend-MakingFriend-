import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Container = styled.View`
  margin: 30px 0px 10px 0px;
  align-items: center;
`;

const ProfileImage = styled.Image`
  background-color: ${({ theme }) => theme.imageBackground};
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const Image = ({ url }) => {
  return (
    <Container>
      <ProfileImage source={{ uri: url }} />
    </Container>
  );
};

Image.propTypes = {
  url: PropTypes.string,
};
export default Image;
