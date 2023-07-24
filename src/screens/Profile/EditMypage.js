import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import user1 from "./data/user1.json";
import { BigButton } from "../../components/auth";

import { UserImage, UserInfoText } from "../../components/profile";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 30px;
`;
const ProfileSectionContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 10px;
  background-color: ${({ theme }) => theme.bigbutton};
`;
const DEFAULT_PHOTO =
  "https://firebasestorage.googleapis.com/v0/b/rn-chat-15e2f.appspot.com/o/img.png?alt=media&token=7677bf2d-0a84-4a2f-835b-eacfbca64e4a";

const EditMypage = ({ navigation }) => {
  const [photo, setPhoto] = useState(DEFAULT_PHOTO);

  return (
    <KeyboardAwareScrollView>
      <Container>
        <ProfileSectionContainer>
          <UserImage url={photo} />
          <UserInfoText value={user1.nickName} isNickname={true} />
          <UserInfoText value={user1.userName} isUsername={true} />
          <BigButton
            title="수정"
            onPress={() => navigation.navigate("Mypage")}
          />
        </ProfileSectionContainer>
        <UserInfoText label="아이디(학번)" value={user1.userId} />
        <UserInfoText label="학과" value={user1.major} />
        <UserInfoText label="이메일" value={user1.email} />
        <UserInfoText label="생일" value={user1.birthday} />
        <UserInfoText label="성별" value={user1.gender} />
        <UserInfoText label="전화번호" value={user1.phoneNumber} />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default EditMypage;
