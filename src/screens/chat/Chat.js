import React, { useState } from "react";
import styled from "styled-components/native";
import { Input } from "../../components/common";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialIcons } from "@expo/vector-icons";
import { LOGO } from "@env";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const StyledText = styled.Text`
  font-size: 30px;
`;

const SendIcon = styled(MaterialIcons).attrs(({ theme, text }) => ({
  name: "send",
  size: 24,
  color: text ? theme.sendBtnActive : theme.sendBtnInactive,
}))``;

const Drawer = createDrawerNavigator();

//임시 user
const uid = "1";
const name = "k";
const photo = `${LOGO}`;

//메시지 전송
const _handleMessageSend = async (messageList) => {
  const message = messageList[0];
  try {
    await createMessage({ channelId: route.params.id, message });
  } catch (e) {
    Alert.alert("Message Error", e.message);
  }
};

//전송 버튼
const SendButton = (props) => {
  return (
    <Send
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
      }}
      disabled={!props.text}
    >
      <SendIcon text={props.text} />
    </Send>
  );
};

const Chat = ({ route }) => {
  console.log("chat component : ", info);
  const info = route.params;
  console.log("chat component : ", info);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");


  return (
    <Container>
      <StyledText>{info.roomName} </StyledText>
      <GiftedChat
        placeholder="Enter a message ..."
        messages={messages}
        user={{ _id: uid, name, avatar: photo }}
        onSend={_handleMessageSend}
        renderSend={(props) => <SendButton {...props} />}
        scrollToBottom={true}
        renderUsernameOnMessage={true}
        alwaysShowSend={true}
        multiline={false}
      />
    </Container>
  );
};

export default Chat;
