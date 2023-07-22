import React, { forwardRef } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

//   background-color: ${({ theme, editable }) =>
//     editable ? theme.inputBackground : theme.inputDisabled};
//   color: ${({ theme }) => theme.text || "black"};
const StyledInput = styled.TextInput`
  padding: 20px 10px;
  font-size: 16px;
  border: none;
  border-width: 0 0 1px;
  border-color: ${({ theme }) => theme.border};
`;
// border-outline: none;

const Container = styled.View`
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

const Label = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.label};
`;

const Input = forwardRef(
  ({ onSubmitEditing, returnKeyType, placeholder }, ref) => {
    return (
      <Container>
        <StyledInput
          onSubmitEditing={onSubmitEditing}
          ref={ref}
          placeholder={placeholder}
          returnKeyType={returnKeyType}
        />
      </Container>
    );
  },
);

Input.propTypes = {
  onSubmitEditing: PropTypes.func,
  returnKeyType: PropTypes.oneOf(["done", "next"]),
};

export default Input;
