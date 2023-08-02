import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput } from "react-native";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LOGO, SOCKET_URL } from "@env";
import styled from "styled-components/native";

const SYSTEM = "SY";
const TALK = "TA";
const IMAGE = "IM";
const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
`;
const SendIcon = styled(MaterialIcons).attrs(({ theme, text }) => ({
  name: "send",
  size: 24,
  color: text ? theme.sendBtnActive : theme.sendBtnInactive,
}))``;

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

//사용자 정보 불러오기?
const getCurrentUser = () => {
  return {
    uid: "537664cc",
    name: "steve",
    photo: "",
  };
};

const Chat = ({ route }) => {
  const { uid, name, photo } = getCurrentUser();
  const [messages, setMessages] = useState([]);
  const messageArray = useRef([]);
  const webSocketURL = `${SOCKET_URL}`;

  const dataForHandshake = {
    headers: {
      ["_id"]: route.params.id,
    },
  };

  const ws = new WebSocket(webSocketURL, null, {
    headers: {
      _id: route.params.id,
    },
  });

  useEffect(() => {
    // WebSocket 연결
    ws.onopen = () => {
      console.log("WebSocket connected");
      // const connectMessage = `채팅창 입장`;
      console.log(ws);
    };
    ws.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    ws.onmessage = (event) => {
      // 서버로부터 메시지 수신
      const data = event.data;

      command = "message";
      // 메시지 파싱
      const parsedMessage = JSON.parse(data);
      console.log("Received message:", parsedMessage);
      // 메시지를 messageArray에 추가
      messageArray.current.unshift(parsedMessage);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
    return () => {
      // 컴포넌트가 언마운트 될 때 WebSocket 연결 해제
      if (ws) {
        ws.close();
      }
    };
  }, []);
  useEffect(() => {
    setMessages(messageArray.current);
    GiftedChat.append(messages);
  }, [messageArray.current]);

  const createMessage = (text) => {
    const newMessage = {
      _id: `${Date.now()}`,
      text: text,
      createdAt: new Date(),
      user: {
        _id: uid,
        name: name,
        avatar: "https://facebook.github.io/react/img/logo_og.png",
      },
    };
    return newMessage;
  };

  const handleMessage = (messageList) => {
    if (!ws) {
      console.error("WebSocket is not connected");
      return;
    }

    const newMessage = createMessage(messageList[0].text);

    console.log("send message", newMessage);

    // const data = {
    //   type: TALK,
    //   message: newMessage,
    //   roomId: route.params.id,
    // };
    const payload = {
      type: TALK,
      message: newMessage,
      roomId: route.params.id,
    };
    console.log("send paylaod", payload);

    ws.send(JSON.stringify(payload));
  };

  return (
    <Container>
      <GiftedChat
        placeholder="Enter a message ..."
        messages={messages}
        user={{ _id: uid, name, avatar: photo }}
        onSend={handleMessage}
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
