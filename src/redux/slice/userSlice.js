import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const initialState = {
  profile: {
    userName: "",
    nickname: "",
    major: "",
    email: "",
    birthday: "",
    gender: "",
    phoneNumber: "",
    score: 0,
    // photo 추가 예정
  },
  security: {
    accessToken: "",
    refreshToken: "",
  },
  userId: "",
};

// 자동로그인 구현시 사용 예정
export const saveUserIdAndPasswordAsyncStorage = createAsyncThunk(
  "user/saveUserIdAndPasswordAsyncStorage",
  async ({ userId, password }, thunkAPI) => {
    try {
      if (userId) {
        await AsyncStorage.setItem("userId", userId);
        await AsyncStorage.setItem("password", password);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
const convertState = ({ data }) => {
  const state = {
    nickname: data.nickname, // 다름
    userName: data.userName,
    major: data.major,
    email: data.email, // 다름
    birthday: data.birthday,
    gender: data.gender,
    phoneNumber: data.phoneNumber,
    score: data.score,
  };
  return state;
};
const convertState2 = (data) => {
  // console.log(data);
  const state = {
    nickname: data.userInput.nickname, // 다름
    userName: data.userInput.userName,
    major: data.userInput.major,
    email: data.userInput.email, // 다름
    birthday: data.userInput.birthday,
    gender: data.userInput.gender,
    phoneNumber: data.userInput.phoneNumber,
    score: data.userInput.score,
  };
  return state;
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.security.accessToken = action.payload.accessToken;
      state.security.refreshToken = action.payload.refreshToken;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      const { data } = action.payload.data;

      state.profile = convertState(action.payload.data);
      state.userId = action.payload.userId;
      state.security.accessToken = data.accessToken;
      state.security.refreshToken = data.refreshToken;
    });

    builder.addCase(saveEditMypage.fulfilled, (state, action) => {
      state.profile = convertState2(action.payload);
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.userId = "";
      state.profile.nickname = "";
      state.profile.userName = "";
      state.profile.major = "";
      state.profile.email = "";
      state.profile.birthday = "";
      state.profile.gender = "";
      state.profile.phoneNumber = "";
      state.profile.score = 0;
      state.security.accessToken = "";
      state.security.refreshToken = "";
    });

    builder.addCase(
      saveUserIdAndPasswordAsyncStorage.fulfilled,
      (state, action) => {
        // 자동로그인 구현
      },
    );
  },
});

export const register = createAsyncThunk(
  "user/register",
  async ({ userInput }) => {
    try {
      // const response = await fetch(`http://172.30.1.18:8020/auth/register`, {
      const response = await fetch(`${API_URL}/auth/register`, {
        // fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log("data: " + data);
      return data; // 받아온 데이터를 반환합니다.
    } catch (error) {
      throw error; // 에러가 발생하면 에러를 던집니다.
    }
  },
);

export const login = createAsyncThunk("user/login", async ({ userInput }) => {
  try {
    // console.log("===========시작========");
    // console.log(userInput);
    // console.log("===========끝========");

    const response = await fetch(`${API_URL}/auth/login`, {
      // const response = await fetch(`http://172.20.10.7:8020/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const data = await response.json(); // 서버 응답을 JSON으로 파싱
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return { data, userId: userInput.userId }; // 받아온 데이터를 반환합니다.
  } catch (error) {
    throw error; // 에러가 발생하면 에러를 던집니다.
  }
});

export const saveEditMypage = createAsyncThunk(
  "user/saveEditMypage",
  async ({ saveEditMypageInput }) => {
    try {
      const response = await fetch(
        `${API_URL}/user/info/update/${saveEditMypageInput.userId}`,
        // `http://172.20.10.7:8020/user/info/update/${saveEditMypageInput.userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${saveEditMypageInput.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saveEditMypageInput.userInput),
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return { userInput: saveEditMypageInput.userInput }; // 받아온 데이터를 반환합니다.
    } catch (error) {
      throw error;
    }
  },
);

export const logout = createAsyncThunk(
  "user/logout",
  async ({ logoutInput }) => {
    try {
      const response = await fetch(
        `http://${API_URL}/user/logout/${logoutInput.userId}`,
        // `http://172.20.10.7:8020/user/logout/${logoutInput.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${logoutInput.accessToken}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return data; // 받아온 데이터를 반환합니다.
    } catch (error) {
      throw error; // 에러가 발생하면 에러를 던집니다.
    }
  },
);

// export const { saveProfile } = userSlice.actions;

export default userSlice.reducer;
