import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "@env";
const initialState = {
  roomInfo: {
    // _id: "",
    // blockedMember: [],
    // createdAt: "",
    // isfull: false,
    // introduce: "",
    // maxParticipants: 2,
    // participants: [],
    // roomName: "",
  },
  totalPage: 0,
  currentPage: 1,
  messages: [],
  chatList: [],
  involvedList: [],
  status: {
    isInvite: "",
    isEntered: false,
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    //방 입장시 정보 초기화
    initRoomInfo: (state, action) => {
      state.roomInfo = action.payload;
      state.currentPage = 1;
      state.status.isEntered = false;
    },
    increasePage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    addMessage: (state, action) => {
      console.log("addMessage------------------ ", action.payload);
      state.messages.unshift(action.payload);
    },
    flushMessage: (state) => {
      state.messages = [];
    },
    setInvite: (state) => {
      state.status.isInvite = state.payload;
    },
    setEnter: (state) => {
      console.log(
        "----------------------wggududuududdu---------------",
        state.status,
      );
      state.status.isEntered = true;
      console.log(state.status);
    },
    setExit: (state) => {
      state.status.isEntered = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getPageInfo.fulfilled, (state, action) => {
      // getInfo Thunk가 성공적으로 완료되었을 때, 받아온 데이터를 상태에 반영
      state.totalPage = action.payload;
    });

    builder.addCase(getListInfo.fulfilled, (state, action) => {
      // getInfo Thunk가 성공적으로 완료되었을 때, 받아온 데이터를 상태에 반영

      state.chatList = action.payload.data;
      console.log(action.payload.data[0]);
    });

    builder.addCase(getInvoledList.fulfilled, (state, action) => {
      // getInfo Thunk가 성공적으로 완료되었을 때, 받아온 데이터를 상태에 반영
      state.involvedList = action.payload.data;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      // getInfo Thunk가 성공적으로 완료되었을 때, 받아온 데이터를 상태에 반영
      // console.log("slice messages ", action.payload.data);
      action.payload.data.forEach((message) => {
        if (!state.messages.find((msg) => msg._id === message._id)) {
          state.messages.push(message);
        }
      });
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  initRoomInfo,
  addMessage,
  increasePage,
  flushMessage,
  setInvite,
  setEnter,
  setExit,
} = chatSlice.actions;

export default chatSlice.reducer;

/**
 * 서버 비동기 처리를 위한 코드
 */
// fetch(`${API_URL}/room/list`,

export const getListInfo = createAsyncThunk("chat/getListInfo", async () => {
  try {
    const response = await fetch(`${API_URL}/room/list`); // 서버의 API 엔드포인트를 입력합니다.
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data; // 받아온 데이터를 반환합니다.
  } catch (error) {
    throw error; // 에러가 발생하면 에러를 던집니다.
  }
});

//total page 불러오기
export const getPageInfo = createAsyncThunk(
  "chat/getPageInfo",
  async (info) => {
    try {
      // console.log("accessToken", info);

      const response = await fetch(`${API_URL}/room/pages/${info.room._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${info.token}`,
        },
      }); // 서버의 API 엔드포인트를 입력합니다.
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log("data", data);
      return data; // 받아온 데이터를 반환합니다.
    } catch (error) {
      throw error; // 에러가 발생하면 에러를 던집니다.
    }
  },
);

export const getInvoledList = createAsyncThunk(
  "chat/getInvoledList",
  async (accessToken) => {
    try {
      const response = await fetch(`${API_URL}/room/list/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data; // 받아온 데이터를 반환합니다.
    } catch (error) {
      throw error; // 에러가 발생하면 에러를 던집니다.
    }
  },
);

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (args) => {
    const { roomId, token, currentPage } = args;
    console.log("info---------------", args);
    // const state = roomInfo.getState(roomInfo);
    try {
      // console.log("info---------------w---", state.chat.roomInfo._id);
      const response = await fetch(
        `${API_URL}/room/message/${roomId}/${currentPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data; // 받아온 데이터를 반환합니다.
    } catch (error) {
      throw error; // 에러가 발생하면 에러를 던집니다.
    }
  },
);

/**
 * 채팅메시지 목록 불러오기
 */
// const getChatMessages = (page) => {
//   fetch(`${API_URL}/room/message/${route.params.info._id}/${totalPage}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${user.accessToken}`,
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       return response.json();
//     })
//     .then((data) => {
//       // console.log("getChatMessages 요청 성공:");
//       console.log("first add :", data);
//       addListMessage(data.data);
//     })
//     .catch((error) => {
//       console.error("getChatMessages", error);
//     });
// };
