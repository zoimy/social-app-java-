import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api, BASE_URL } from "../../config/api";
import { RootState } from "../store";
import { searchUserByQueryAction } from "./auth";

type UserProps = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
};

export type MessageProps = {
  id: number;
  image: string;
  content: string;
  user: UserProps;
};

export type ChatProps = {
  id: number;
  chat_name: string;
  chat_image: string;
  content: string;
  users: UserProps[];
  messages: MessageProps[];
};

type MessageState = {
  message: MessageProps | null;
  chats: ChatProps[];
  loading: boolean;
  error: string | null;
};

const initialState: MessageState = {
  message: null,
  chats: [],
  loading: false,
  error: null,
};

export const createMessageAction = createAsyncThunk<
  MessageProps,
  {content: string; image: string | null; chatId: number, sendMessageToServer: (message: MessageProps) => void },
  { rejectValue: string }
>(
  "auth/createMessage",
  async ({ content, image, chatId, sendMessageToServer }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        `${BASE_URL}/api/messages/chat/${chatId}`,
        { content, image }
      );
			sendMessageToServer(data)
      console.log(data);

      return data;
    } catch (error: any) {
      return rejectWithValue("createMessage failed");
    }
  }
);

export const createChatAction = createAsyncThunk<
  ChatProps,
  { userId: number },
  { rejectValue: string }
>("auth/createChat", async ({ userId }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`${BASE_URL}/api/chats`, { userId });
    console.log(data);

    return data;
  } catch (error: any) {
    return rejectWithValue("createChat failed");
  }
});

export const getAllUsersChatAction = createAsyncThunk<
  ChatProps[],
  void,
  { rejectValue: string }
>("auth/getAllUsersChat", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`${BASE_URL}/api/chats`);
    console.log(data);

    return data;
  } catch (error: any) {
    return rejectWithValue("getAllUsersChat failed");
  }
});

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMessageAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createMessageAction.fulfilled,
        (state, action: PayloadAction<MessageProps>) => {
          state.loading = false;
          state.message = action.payload;
          state.error = null;
        }
      )
      .addCase(
        createMessageAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "createMessage failed";
        }
      )
      .addCase(createChatAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createChatAction.fulfilled,
        (state, action: PayloadAction<ChatProps>) => {
          state.loading = false;
          state.chats = [action.payload, ...state.chats];
          state.error = null;
        }
      )
      .addCase(
        createChatAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "createChat failed";
        }
      )
      .addCase(getAllUsersChatAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllUsersChatAction.fulfilled,
        (state, action: PayloadAction<ChatProps[]>) => {
          state.loading = false;
          state.chats = action.payload;
          state.error = null;
        }
      )
      .addCase(
        getAllUsersChatAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "getAllUsersChat failed";
        }
      )
  },
});

export const messageReducer = messageSlice.reducer;

// export const selectJwt = (state: RootState) => state.auth.jwt;
