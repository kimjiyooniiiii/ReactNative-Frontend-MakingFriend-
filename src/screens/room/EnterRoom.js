import React, { useContext, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPageInfo } from "../../redux/slice/chatSlice";
import { UserContext } from "../../contexts/User";

const EnterRoom = ({ navigation }) => {
  const page = useSelector((state) => state.chat.totalPage);
  const room = useSelector((state) => state.chat.roomInfo);
  const { user } = useContext(UserContext);
  const token = user.accessToken;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPageInfo({ room, token }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <ImageComponent
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/rudoori.appspot.com/o/gom%2Fgom.png?alt=media",
          }}
        />
        <TitleContainer>
          <Title></Title>
          <TitleName>{room.roomName}</TitleName>
        </TitleContainer>
        <IntroduceContainer>
          <Introduce>우리 방을 소개합니다</Introduce>
          <IntroduceContent>{room.introduce}</IntroduceContent>
          <Numbers>정원 : {room.maxParticipants}명</Numbers>
          <Date>{room.formattedTime}</Date>
        </IntroduceContainer>
        <ButtonContainer>
          <EnterButton
            title="입장"
            onPress={() => {
              navigation.navigate("Chat");
            }}
          >
            <ButtonText>입장</ButtonText>
          </EnterButton>
        </ButtonContainer>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex: 1;
`;

const ImageComponent = styled(Image)`
  width: 70px;
  height: 70px;
  position: absolute;
  right: 10px;
  top: 170px;
`;

const TitleContainer = styled.View`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.titleBackground};
  padding: 15px 15px 15px 15px;
  margin: 15px 15px 15px 30px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.grey};
  font-size: 17px;
  position: absolute;
  top: 20px;
`;

const TitleName = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  font-size: 30px;
`;

const IntroduceContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin: 20px 20px 20px 20px;
  background-color: ${({ theme }) => theme.introduceBackground};
  width: 350px;
  height: 330px;
  border-radius: 20px;
  border-width: 2px;
  border-color: black;
`;

const Introduce = styled.Text`
  color: ${({ theme }) => theme.grey};
  font-size: 20px;
  position: absolute;
  top: 20px;
  left: 20px;
`;

const IntroduceContent = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  font-size: 20px;
  padding: 0 0 0 0;
`;

const Numbers = styled.Text`
  color: ${({ theme }) => theme.grey};
  font-size: 20px;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 30px 0 0 0;
`;

const BackButton = styled.TouchableOpacity`
  width: 100px;
  height: 50px;
  background-color: ${({ theme }) => theme.buttonBackground};
  border-radius: 5px;
  margin-right: 30px;
  border-width: 1px;
  border-color: black;
  align-items: center;
  justify-content: center;
`;

const EnterButton = styled.TouchableOpacity`
  width: 100px;
  height: 50px;
  background-color: ${({ theme }) => theme.buttonBackground};
  border-radius: 5px;
  margin-left: 30px;
  border-width: 1px;
  border-color: black;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 20px;
`;

const ButtonText = styled.Text`
  color: black;
  font-size: 15px;
`;

const DateContainer = styled.View`
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.background};
  width: 180px;
  height: 45px;
  position: absolute;
  right: 5px;
  bottom: 10px;
  border-radius: 20px;
`;

const Date = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  padding: 0 0 0 0;
`;

export default EnterRoom;
