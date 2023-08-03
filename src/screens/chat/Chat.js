import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { MaterialIcons } from "@expo/vector-icons";
import { LOGO, SOCKET_URL, API_URL } from "@env";
import styled from "styled-components/native";
import { UserContext } from "../../contexts/User";

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

const Chat = ({ route }) => {
  console.log(route);
  const name = "John Doe";
  const roomId = route.params.info._id;
  const totalPage = route.params.totalPage;
  const photo = { LOGO };
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const messageArray = useRef([]);

  // 메시지 배열을 Memo 기능으로 관리
  const memoizedMessages = useMemo(() => messages, [messages]);

  const webSocketURL = `${SOCKET_URL}`;
  const ws = new WebSocket(webSocketURL, null, {
    headers: {
      room: roomId,
      user: user.userId,
    },
  });
  useEffect(() => {
    getChatMessages(page);
  }, [page]);

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
      // console.log("Received message:", parsedMessage);
      // 메시지를 messageArray에 추가
      // messageArray.current.unshift(parsedMessage);
      addMessage(parsedMessage);
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

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
  };
  const addListMessage = (newMessage) => {
    setMessages((prevMessages) => GiftedChat.append(newMessage, prevMessages));
  };

  const createMessage = (text) => {
    const newMessage = {
      _id: `${Date.now()}`,
      text: text,
      createdAt: new Date(),
      user: {
        _id: user.userId,
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

    const payload = {
      type: TALK,
      message: newMessage,
      roomId: roomId,
    };
    console.log("send paylaod", payload);

    ws.send(JSON.stringify(payload));
  };

  /**
   * GiftedChat의 loadEarlier 이벤트 핸들러
   * 이전 페이지의 채팅 메시지를 불러옴
   */
  const handleLoadEarlier = () => {
    console.log(page);
    if (page < totalPage) {
      // 아직 불러올 페이지가 남아있는 경우에만 다음 페이지를 불러옴
      let next = page + 1;
      setPage(next);
      console.log(page);
      getChatMessages(page);
    }
  };

  /**
   * 채팅메시지 목록 불러오기
   */
  const getChatMessages = (page) => {
    fetch(`${API_URL}/room/message/${route.params.info._id}/${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        console.log("getChatMessages 요청 성공:");
        console.log(data);
        addListMessage(data.data);
      })
      .catch((error) => {
        console.error("getChatMessages", error);
      });
  };
  const uniqueMessages = messages.reduce((acc, curr) => {
    if (!acc.find((msg) => msg._id === curr._id)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return (
    <Container>
      <GiftedChat
        placeholder="Enter a message ..."
        messages={uniqueMessages}
        user={{ _id: user.userId, name, avatar: photo }}
        onSend={handleMessage}
        renderSend={(props) => <SendButton {...props} />}
        scrollToBottom={true}
        renderUsernameOnMessage={true}
        alwaysShowSend={true}
        multiline={false}
        onLoadEarlier={handleLoadEarlier}
        loadEarlier={page < totalPage}
      />
    </Container>
  );
};

export default Chat;
