import React, { useRef, useState, useContext } from "react";
import { Image } from "react-native";
// import logo from "../../../assets/images/logo.jpg";
import { BigButton, SmallButton, Input } from "../../components/auth";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL } from "@env";
import { UserContext } from "../../contexts";

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
  const [userInput, setUserInput] = useState({
    userId: "",
    password: "",
  });

  const { setTokens } = useContext(UserContext);
  // const { accessTokenValue, refreshTokenValue } = useContext(UserContext);
  // console.log(refreshTokenValue);
  const _handleLoginButtonPress = () => {
    console.log(JSON.stringify(userInput));
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
      },
      body: JSON.stringify(userInput),
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((res) => {
        // console.log("db accessToken: " + res.data.accessToken);
        // console.log("db refreshToken: " + res.data.refreshToken);

        // accessTokenValue.setAccessTokenValue(res.data.accessToken);
        // refreshTokenValue.setRefreshTokenValue(res.data.refreshToken);
        setTokens(res.data.accessToken, res.data.refreshToken);

        // console.log("AccessContext: " + accessTokenValue.accessToken);
        // console.log("RefreshContext: " + refreshTokenValue.refreshToken);
        // navigation.navigate("Main");
        // navigation.navigate("Main", {
        //   screen: "home",
        // });
        navigation.navigate("Main");
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const _handleUserInputChange = (fieldName, value) => {
    // console.log(fieldName + ": " + value);

    setUserInput({
      ...userInput,
      [fieldName]: value,
    });
  };

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
        onChangeText={(value) => _handleUserInputChange("userId", value)}
      />
      <Input
        ref={refPassword}
        placeholder="비밀번호"
        returnKeyType="done"
        onChangeText={(value) => _handleUserInputChange("password", value)}
      />
      <BigButton title="로그인" onPress={_handleLoginButtonPress} />
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
