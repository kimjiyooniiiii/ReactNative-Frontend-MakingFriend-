import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialIcons } from "@expo/vector-icons";
import { LOGO, SOCKET_URL, API_URL } from "@env";
import styled from "styled-components/native";
import { UserContext } from "../../contexts/User";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  increasePage,
  addMessage,
} from "../../redux/slice/chatSlice";

const ENTER = "EN";
const SYSTEM = "SY";
const TALK = "TA";
const IMAGE = "IM";

//사용자 정보 불러오기?

const Chat = () => {
  const page = useSelector((state) => state.chat.totalPage);
  const currentPage = useSelector((state) => state.chat.currentPage);
  const room = useSelector((state) => state.chat.roomInfo);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const name = "John Doe";
  const roomId = room._id;

  const photo = { LOGO };
  const { user } = useContext(UserContext);
  const token = user.accessToken;

  console.log("roomId", roomId);

  const messageArray = useRef([]);

  const webSocketURL = `${SOCKET_URL}`;
  const ws = new WebSocket(webSocketURL, null, {
    headers: {
      room: roomId,
      user: user.userId,
    },
  });
  useEffect(() => {
    console.log(
      "effect==================================================",
      currentPage,
      page,
    );
    if (currentPage < page) {
      getChatMessages();
      dispatch(increasePage());
    }
  }, []);

  useEffect(() => {
    // WebSocket 연결
    ws.onopen = () => {
      console.log("WebSocket connected");
      // const initialMessage = "hi";
      // ws.send(JSON.stringify(initialMessage));
      createSystemMessage(ENTER, `${user.userId} 님이 입장했습니다.`);
    };
    ws.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    ws.onmessage = (event) => {
      // 서버로부터 메시지 수신
      const data = event.data;

      // 메시지 파싱
      const parsedMessage = JSON.parse(data);
      console.log(
        "before addMessage==============================",
        parsedMessage,
      );
      dispatch(addMessage(parsedMessage));
      console.log(
        "after addMessage==============================",
        parsedMessage,
      );
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

  /**
   * 시스템 메시지 전달 생성,
   */

  const createSystemMessage = (command, text) => {
    /**
     * {
         _id: 1,
          text: 'This is a system message',
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          system: true,
          // Any additional custom parameters are passed through
        }
     */
    const newMessage = systemMessage(command, text);
    const payload = {
      type: SYSTEM,
      message: newMessage,
      roomId: roomId,
    };
    ws.send(JSON.stringify(payload));
  };

  const systemMessage = (command, text) => {
    const newMessage = {
      _id: `${Date.now()}`,
      text: text,
      createdAt: new Date(),
      system: true,
      user: {
        _id: user.userId,
        name: name,
        avatar: `${LOGO}`,
      },
      command: command,
    };
    return newMessage;
  };

  const createMessage = (text) => {
    const newMessage = {
      _id: `${Date.now()}`,
      text: text,
      createdAt: new Date(),
      user: {
        _id: user.userId,
        name: name,
        avatar: `${LOGO}`,
      },
    };
    return newMessage;
  };

  /**
   * 메시지 전달
   * @param {} messageList
   * @returns
   */
  const handleMessage = (messageList) => {
    if (!ws) {
      console.error("WebSocket is not connected");
      return;
    }

    const newMessage = createMessage(messageList[0].text);

    const payload = {
      type: TALK,
      message: newMessage,
      roomId: roomId,
    };

    ws.send(JSON.stringify(payload));
  };

  /**
   * GiftedChat의 loadEarlier 이벤트 핸들러
   * 이전 페이지의 채팅 메시지를 불러옴
   */
  const handleLoadEarlier = () => {
    if (currentPage <= page) {
      // 아직 불러올 페이지가 남아있는 경우에만 다음 페이지를 불러옴
      dispatch(increasePage());
      getChatMessages();
    }
  };
  /**
   * 채팅메시지 목록 불러오기
   */
  const getChatMessages = () => {
    dispatch(getMessages({ token, roomId, currentPage }));
  };
  return (
    <Container>
      <GiftedChat
        placeholder="Enter a message ..."
        messages={messages}
        user={{ _id: user.userId, name, avatar: photo }}
        onSend={handleMessage}
        renderSend={(props) => <SendButton {...props} />}
        scrollToBottom={true}
        renderUsernameOnMessage={true}
        alwaysShowSend={true}
        multiline={false}
        onLoadEarlier={handleLoadEarlier}
        loadEarlier={currentPage <= page}
      />
    </Container>
  );
};

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
export default Chat;
