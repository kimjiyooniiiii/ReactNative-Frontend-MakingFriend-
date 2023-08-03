import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = React.createContext({
  user: { userId: "", accessToken: "", refreshToken: "" },
  setUserId: () => {},
  setTokens: () => {},
  // setAccessToken: () => {},
  // setRefreshToken: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: "",
    accessToken: "",
    refreshToken: "",
  });

  const setUserId = async (userId) => {
    try {
      if (userId) {
        await AsyncStorage.setItem("userId", userId);
        setUser((prev) => ({ ...prev, userId: userId }));
      }
    } catch (error) {
      console.error("Error setting userId:", error);
    }
  };

  const setTokens = async (accessToken, refreshToken) => {
    try {
      if (accessToken && refreshToken) {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        setUser((prev) => ({
          ...prev,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }));
      }
    } catch (error) {
      console.error("Error setting tokens:", error);
    }
  };

  // useEffect(() => {
  //   const fetchUserContext = async () => {
  //     try {
  //       const userId = await AsyncStorage.getItem("userId");
  //       const accessToken = await AsyncStorage.getItem("accessToken");
  //       const refreshToken = await AsyncStorage.getItem("refreshToken");
  //       setUser({ userId, accessToken, refreshToken });
  //       console.log("useeFFECT:" + userId);
  //     } catch (error) {
  //       console.error("Error fetching fetchUserContext:", error);
  //     }
  //   };

  //   fetchUserContext();
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUserId, setTokens }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
