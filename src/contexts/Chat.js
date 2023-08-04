import React, { useState, createContext, Children } from "react";

const ChatContext = createContext({
  roomName: "",
  roomId: "",
  userList: [{ id: "", userName: "" }],
  setName: () => {},
  setId: () => {},
  setList: () => {},
  removeUser: () => {},
});

const ChatProvider = ({ children }) => {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [userList, setUserList] = useState([]);

  const setName = ({ name }) => {
    setRoomName({ name });
  };

  const setId = ({ id }) => {
    setRoomId({ id });
  };

  const setList = ({ user }) => {
    setUserList((list) => {
      return [...list, user];
    });
  };

  const removeUser = (userId) => {
    setUserList((list) => {
      return list.filter((user) => user.id !== userId);
    });
  };
  const value = {
    roomName,
    roomId,
    userList,
    setName,
    setId,
    setList,
    removeUser,
  };

  return <ChatContext.Provider value={value}>{Children}</ChatContext.Provider>;
};
export { ChatContext, ChatProvider };
