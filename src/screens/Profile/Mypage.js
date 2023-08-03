import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { SafeAreaView, Platform } from "react-native";
import { BigButton } from "../../components/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserImage, UserInfoText } from "../../components/profile";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { UserContext } from "../../contexts";
import { API_URL } from "@env";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
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
const ElementContainer = styled.View`
  margin-top: 4px;
  flex-direction: row;
  justify-content: center;
`;
const DEFAULT_PHOTO =
  "https://firebasestorage.googleapis.com/v0/b/rn-chat-15e2f.appspot.com/o/img.png?alt=media&token=7677bf2d-0a84-4a2f-835b-eacfbca64e4a";

const Mypage = ({ navigation }) => {
  const [photo, setPhoto] = useState(DEFAULT_PHOTO);
  // let user1 = null;
  const { user } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState({});
  const isFocused = useIsFocused();

  // console.log(user.userId);
  useEffect(() => {
    fetchUserInfo(); // 최초 렌더링 시 사용자 정보를 가져오는 함수 호출
  }, [user.accessToken, isFocused]); // useEffect의 의존성 배열에 isFocused 추가

  const fetchUserInfo = () => {
    fetch(`${API_URL}/user/info?userId=${user.userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(JSON.stringify(res.data));
        setUserInfo(res.data);
        // user1 = JSON.stringify(res.data);
        // console.log(user1);
      });
  };

  const _handleLogoutButtonPress = () => {
    fetch(`${API_URL}/user/logout/${user.userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // setUserId(userInput.userId);-
        if (res) {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <Container>
          <ProfileSectionContainer>
            <UserImage url={photo} />
            <UserInfoText value={userInfo.nickName} isNickname={true} />
            <UserInfoText value={userInfo.userName} isUsername={true} />
            <ElementContainer>
              <BigButton
                title="점수 보기"
                onPress={() => navigation.navigate("Myscore")}
              />
              <BigButton
                title="정보 수정"
                onPress={() => navigation.navigate("EditMypage")}
              />
              <BigButton title="로그아웃" onPress={_handleLogoutButtonPress} />
            </ElementContainer>
          </ProfileSectionContainer>
          <UserInfoText label="아이디(학번)" value={userInfo.userId} />
          <UserInfoText label="학과" value={userInfo.major} />
          <UserInfoText label="이메일" value={userInfo.email} />
          <UserInfoText label="생일" value={userInfo.birthday} />
          <UserInfoText label="성별" value={userInfo.gender} />
          <UserInfoText label="전화번호" value={userInfo.phoneNumber} />
        </Container>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Mypage;
