import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.security.accessToken = action.payload.data.accessToken;
      state.security.refreshToken = action.payload.data.refreshToken;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      console.log("===========action.payload=====start==========");
      console.log(action.payload);
      console.log("===========action.payload=====end==========");
      state.userId = action.payload.data.userId;
      state.profile.nickname = action.payload.data.nickname;
      state.profile.major = action.payload.data.major;
      state.profile.email = action.payload.data.email;
      state.profile.birthday = action.payload.data.birthday;
      state.profile.gender = action.payload.data.gender;
      state.profile.phoneNumber = action.payload.data.phoneNumber;
      state.profile.score = action.payload.data.score;
      state.security.accessToken = action.payload.data.accessToken;
      state.security.refreshToken = action.payload.data.refreshToken;
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
      const response = await fetch(`http://172.30.1.18:8005/auth/register`, {
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
      console.log("data: " + data);
      return data; // 받아온 데이터를 반환합니다.
    } catch (error) {
      throw error; // 에러가 발생하면 에러를 던집니다.
    }
  },
);

export const login = createAsyncThunk("user/login", async ({ userInput }) => {
  try {
    const response = await fetch(`http://172.30.1.18:8005/auth/login`, {
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
    return data; // 받아온 데이터를 반환합니다.
  } catch (error) {
    throw error; // 에러가 발생하면 에러를 던집니다.
  }
});

export const { saveProfile } = userSlice.actions;

export default userSlice.reducer;
