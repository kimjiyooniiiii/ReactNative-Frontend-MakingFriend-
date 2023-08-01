import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = React.createContext({
  user: { accessToken: "", refreshToken: "" },
  setTokens: () => {},
  // setAccessToken: () => {},
  // setRefreshToken: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ accessToken: "", refreshToken: "" });

  const setTokens = async (accessToken, refreshToken) => {
    try {
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      setUser({ accessToken, refreshToken });
    } catch (error) {
      console.error("Error setting tokens:", error);
    }
  };

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        setUser({ accessToken, refreshToken });
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, []);

  return (
    <UserContext.Provider value={{ user, setTokens }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
