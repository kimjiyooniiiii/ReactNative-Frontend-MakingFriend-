import React, { useRef } from "react";
import { Image } from "react-native";
// import logo from "../../../assets/images/logo.jpg";
import { BigButton, SmallButton, Input } from "../../components/auth";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
`;
const LogoImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const IdPwRegisterContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.hideborder};
`;

const Separator = styled.Text`
  color: ${({ theme }) => theme.border};
  font-size: 15px;
`;
const Login = ({ navigation }) => {
  const refPassword = useRef(null);
  return (
    <Container>
      <LogoImage
        source={require("../../../assets/images/logo.jpg")}
        resizeMode={"contain"}
      />
      <Input
        placeholder="학번"
        onSubmitEditing={() => refPassword.current.focus()}
        returnKeyType="next"
      />
      <Input ref={refPassword} placeholder="비밀번호" returnKeyType="done" />
      <BigButton title="로그인" onPress={() => console.log("로그인 클릭")} />
      <IdPwRegisterContainer>
        <SmallButton
          title="아이디 찾기"
          onPress={() => console.log("아이디 찾기 클릭")}
        />
        <Separator>|</Separator>
        <SmallButton
          title="비밀번호 찾기"
          onPress={() => console.log("비밀번호 찾기 클릭")}
        />
        <Separator>|</Separator>
        <SmallButton
          title="회원가입"
          onPress={() => navigation.navigate("Signup")}
        />
      </IdPwRegisterContainer>
    </Container>
  );
  // return console.log("screens/Login.js 접속");
};

export default Login;
