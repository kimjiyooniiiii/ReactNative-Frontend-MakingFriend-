import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = React.createContext({
  user: { accessToken: "", refreshToken: "" },
  setAccessToken: () => {},
  setRefreshToken: () => {},
  // accessTokenValue: { accessToken: "", setAccessTokenValue: () => {} },
  // refreshTokenValue: { refreshToken: "", setRefreshTokenValue: () => {} },
});

const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const setAccessTokenValue = async (accessToken) => {
    try {
      await AsyncStorage.setItem("accessToken", accessToken);
      setAccessToken(accessToken);
    } catch (error) {
      console.error("Error setting Access token:", error);
    }
  };

  const setRefreshTokenValue = async (refreshToken) => {
    try {
      await AsyncStorage.setItem("refreshToken", refreshToken);
      setRefreshToken(refreshToken);
    } catch (error) {
      console.error("Error setting Refresh token:", error);
    }
  };

  const accessTokenValue = { accessToken, setAccessTokenValue };
  const refreshTokenValue = { refreshToken, setRefreshTokenValue };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        // 토큰이 있으면 UserContext를 통해 로그인 처리
        if (token) {
          // UserContext의 setAccessTokenValue 함수를 호출하여 토큰 저장
          setAccessTokenValue(token);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  // useEffect(() => {
  //   console.log("AccessToken Updated: ", accessToken);
  //   console.log("RefreshToken Updated: ", refreshToken);
  // }, [accessToken, refreshToken]);
  return (
    <UserContext.Provider value={{ accessTokenValue, refreshTokenValue }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
