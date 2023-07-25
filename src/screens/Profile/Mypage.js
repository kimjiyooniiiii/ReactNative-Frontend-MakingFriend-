import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import user1 from "./data/user1.json";
import { SafeAreaView } from "react-native";
import { BigButton } from "../../components/profile";

import { UserImage, UserInfoText } from "../../components/profile";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;
const ProfileSectionContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundSkyblue};
  ${Platform.select({
    ios: "border-bottom-left-radius: 10 10; border-bottom-right-radius: 10 10;", // iOS용 스타일
    android:
      "border-bottom-left-radius: 10px; border-bottom-right-radius: 10px", // Android용 스타일
  })}
`;

const DEFAULT_PHOTO =
  "https://firebasestorage.googleapis.com/v0/b/rn-chat-15e2f.appspot.com/o/img.png?alt=media&token=7677bf2d-0a84-4a2f-835b-eacfbca64e4a";

const Mypage = ({ navigation }) => {
  const [photo, setPhoto] = useState(DEFAULT_PHOTO);

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <Container>
          <ProfileSectionContainer>
            <UserImage url={photo} />
            <UserInfoText value={user1.nickName} isNickname={true} />
            <UserInfoText value={user1.userName} isUsername={true} />
            <BigButton
              title="내 정보 수정"
              onPress={() => navigation.navigate("EditMypage")}
            />
          </ProfileSectionContainer>
          <UserInfoText label="아이디(학번)" value={user1.userId} />
          <UserInfoText label="학과" value={user1.major} />
          <UserInfoText label="이메일" value={user1.email} />
          <UserInfoText label="생일" value={user1.birthday} />
          <UserInfoText label="성별" value={user1.gender} />
          <UserInfoText label="전화번호" value={user1.phoneNumber} />
        </Container>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Mypage;
