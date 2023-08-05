// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_URL } from "@env";

// const initialState = {
//   profile: {
//     userName: "",
//     nickname: "",
//     major: "",
//     email: "",
//     birthday: "",
//     gender: "",
//     phoneNumber: "",
//     score: 0,
//     // photo 추가 예정
//   },
//   security: {
//     accessToken: "",
//     refreshToken: "",
//   },
//   userId: "",
// };

// // 자동로그인 구현시 사용 예정
// export const saveUserIdAndPasswordAsyncStorage = createAsyncThunk(
//   "user/saveUserIdAndPasswordAsyncStorage",
//   async ({ userId, password }, thunkAPI) => {
//     try {
//       if (userId) {
//         await AsyncStorage.setItem("userId", userId);
//         await AsyncStorage.setItem("password", password);
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   },
// );

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     saveProfileFulfilled: (state, action) => {
//       const { data } = action.payload;

//       state.userId = userId;
//       state.profile.nickname = data.nickName;
//       state.profile.userName = data.userName;
//       state.profile.major = data.major;
//       state.profile.email = data.userMail;
//       state.profile.birthday = data.birthday;
//       state.profile.gender = data.gender;
//       state.profile.phoneNumber = data.phoneNumber;
//       state.profile.score = data.score;
//     },
//     logoutFulfilled: (state) => {
//       state.userId = "";
//       state.profile.nickname = "";
//       state.profile.userName = "";
//       state.profile.major = "";
//       state.profile.email = "";
//       state.profile.birthday = "";
//       state.profile.gender = "";
//       state.profile.phoneNumber = "";
//       state.profile.score = 0;
//       state.security.accessToken = "";
//       state.security.refreshToken = "";
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(register.fulfilled, (state, action) => {
//       state.security.accessToken = action.payload.accessToken;
//       state.security.refreshToken = action.payload.refreshToken;
//     });

//     builder.addCase(login.fulfilled, (state, action) => {
//       console.log("=======action========start");
//       console.log(action.payload.data);
//       console.log("=======action========start");
//       const { userId } = action.payload;
//       const { data } = action.payload.data;
//       state.userId = userId;
//       state.profile.nickname = data.nickName;
//       state.profile.userName = data.userName;
//       state.profile.major = data.major;
//       state.profile.email = data.userMail;
//       state.profile.birthday = data.birthday;
//       state.profile.gender = data.gender;
//       state.profile.phoneNumber = data.phoneNumber;
//       state.profile.score = data.score;
//       state.security.accessToken = data.accessToken;
//       state.security.refreshToken = data.refreshToken;
//     });

//     builder.addCase(saveEditMypage.fulfilled, (state, action) => {
//       const { userInput } = action.payload;
//       state.profile.nickname = userInput.nickName;
//       state.profile.userName = userInput.userName;
//       state.profile.major = userInput.major;
//       state.profile.email = userInput.userMail;
//       state.profile.birthday = userInput.birthday;
//       state.profile.gender = userInput.gender;
//       state.profile.phoneNumber = userInput.phoneNumber;
//       state.profile.score = userInput.score;
//     });

//     builder.addCase(
//       saveUserIdAndPasswordAsyncStorage.fulfilled,
//       (state, action) => {
//         // 자동로그인 구현
//       },
//     );
//   },
// });

// export const register = createAsyncThunk(
//   "user/register",
//   async ({ userInput }) => {
//     try {
//       const response = await fetch(`${API_URL}/auth/register`, {
//         // fetch(`${API_URL}/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userInput),
//       });
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       return data; // 받아온 데이터를 반환합니다.
//     } catch (error) {
//       throw error; // 에러가 발생하면 에러를 던집니다.
//     }
//   },
// );

// export const login = createAsyncThunk("user/login", async ({ userInput }) => {
//   try {
//     const response = await fetch(`${API_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userInput),
//     });
//     const data = await response.json(); // 서버 응답을 JSON으로 파싱
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return { data, userId: userInput.userId, userInput }; // 받아온 데이터를 반환합니다.
//   } catch (error) {
//     throw error; // 에러가 발생하면 에러를 던집니다.
//   }
// });

// export const logout = createAsyncThunk(
//   "user/logout",
//   async ({ logoutInput }) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/user/logout/${logoutInput.userId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${logoutInput.accessToken}`,
//           },
//         },
//       );
//       const data = await response.json(); // 서버 응답을 JSON으로 파싱
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return data; // 받아온 데이터를 반환합니다.
//     } catch (error) {
//       throw error; // 에러가 발생하면 에러를 던집니다.
//     }
//   },
// );

// export const saveEditMypage = createAsyncThunk(
//   "user/saveEditMypage",
//   async ({ saveEditMypageInput }) => {
//     try {
//       // console.log("==============saveEditMypageInput========start");
//       // console.log("accessToken: " + saveEditMypageInput.accessToken);
//       // console.log("saveEditMypage.userInput: " + saveEditMypageInput.userInput);
//       // console.log("==============saveEditMypageInput========end");
//       const response = await fetch(
//         `${API_URL}/user/info/update/200000000`,
//         // `http://172.30.1.18:8005/user/info/update/${saveEditMypageInput.userId}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${saveEditMypageInput.accessToken}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(saveEditMypageInput.userInput),
//         },
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       // const data = await response.json(); // 서버 응답을 JSON으로 파싱

//       // console.log("==============data========start");
//       // console.log(data);
//       // console.log("==============data========end");

//       return { userInput: saveEditMypageInput.userInput }; // 받아온 데이터를 반환합니다.
//     } catch (error) {
//       throw error;
//     }
//   },
// );

// export const { logoutFulfilled } = userSlice.actions;

// export default userSlice.reducer;

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
      const { data } = action.payload.data;

      state.userId = action.payload.userId;
      state.profile.nickname = data.nickname; // 다름
      state.profile.userName = data.userName;
      state.profile.major = data.major;
      state.profile.email = data.userMail; // 다름
      state.profile.birthday = data.birthday;
      state.profile.gender = data.gender;
      state.profile.phoneNumber = data.phoneNumber;
      state.profile.score = data.score;
      state.security.accessToken = data.accessToken;
      state.security.refreshToken = data.refreshToken;
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
    const response = await fetch(`${API_URL}/auth/login`, {
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

export const { saveProfile } = userSlice.actions;

export default userSlice.reducer;
