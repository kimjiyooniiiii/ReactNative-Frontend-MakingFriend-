import React, { useState, useRef } from "react";
// import { Image, Dimensions } from "react-native";
import { Dimensions } from "react-native";
import { BigButton, RadioButton, Input, Image } from "../../components/auth";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
`;
const CenteredView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;

// const LogoImage = styled(Image)`
//   width: 150px;
//   height: 150px;
//   border-radius: 15px;
// `;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.label};
`;

const ElementContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const GenderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
`;

// 추후 이미지 처리방법 관련 수정할 것
// 개인 firebase 넣어놨음
const DEFAULT_PHOTO =
  "https://firebasestorage.googleapis.com/v0/b/rn-chat-15e2f.appspot.com/o/img.png?alt=media&token=7677bf2d-0a84-4a2f-835b-eacfbca64e4a";

const Signup = () => {
  const width = Dimensions.get("window").width;
  const [photo, setPhoto] = useState(DEFAULT_PHOTO);
  // const [photo, setPhoto] = useState(logo);

  const [selectedGender, setSelectedGender] = useState("male");

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  const refNickName = useRef(null);
  const refUserId = useRef(null);
  const refMajor = useRef(null);
  const refPassword = useRef(null);
  const refEmail = useRef(null);
  const refBirthday = useRef(null);
  const refGender = useRef(null);
  const refPhoneNumber = useRef(null);

  return (
    <KeyboardAwareScrollView>
      <Container>
        <List width={width}>
          <CenteredView>
            {/* <LogoImage
              source={require("../../../assets/images/logo.jpg")}
              resizeMode={"contain"}
            /> */}
            <Image showButton={true} url={photo} onChangePhoto={setPhoto} />
          </CenteredView>
          <Input
            label="이름"
            placeholder="홍길동"
            onSubmitEditing={() => refNickName.current.focus()}
            returnKeyType="next"
          />
          <Input
            ref={refNickName}
            label="닉네임"
            placeholder="두리"
            onSubmitEditing={() => refUserId.current.focus()}
            returnKeyType="next"
          />
          <Input
            ref={refUserId}
            label="아이디(학번)"
            placeholder="202312345"
            onSubmitEditing={() => refPassword.current.focus()}
            returnKeyType="next"
            numericOnly={true}
            maxLength={9}
          />
          <Input
            ref={refPassword}
            label="비밀번호"
            placeholder="영문 포함 8자 이상"
            onSubmitEditing={() => refMajor.current.focus()}
            returnKeyType="next"
          />
          <Input
            ref={refMajor}
            label="학과"
            placeholder="컴퓨터공학과"
            onSubmitEditing={() => refEmail.current.focus()}
            returnKeyType="next"
          />
          <Input
            ref={refEmail}
            label="이메일"
            placeholder="example@naver.com"
            onSubmitEditing={() => refBirthday.current.focus()}
            returnKeyType="next"
          />

          <Input
            ref={refBirthday}
            label="생일"
            placeholder="2000-12-26"
            onSubmitEditing={() => refGender.current.focus()}
            returnKeyType="next"
            maxLength={10}
          />

          <ElementContainer ref={refGender}>
            <Label>성별</Label>
            <GenderContainer>
              <RadioButton
                genderLabel="남"
                isSelected={selectedGender === "male"}
                onPress={() => handleGenderSelection("male")}
              />
              <RadioButton
                genderLabel="여"
                isSelected={selectedGender === "female"}
                onPress={() => handleGenderSelection("female")}
              />
            </GenderContainer>
          </ElementContainer>

          <Input
            ref={refPhoneNumber}
            label="전화번호"
            placeholder="010-0000-0000"
            returnKeyType="done"
          />
          <BigButton
            title="회원가입"
            onPress={() => console.log("회원가입 클릭")}
          />
        </List>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
