import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api, BASE_URL } from "../../config/api";
import { RootState } from "../store";

type UserProps = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
	posts: [];
	followers: [];
	followings: [];
};

type loginDataProps = {
  email: string;
  password: string;
};

type registerDataProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
};

type AuthState = {
  jwt: string | null;
  loading: boolean;
  error: string | null;
  user: UserProps | null;
	searchUser: UserProps[]
};

const initialState: AuthState = {
  jwt: null,
  loading: false,
  error: null,
  user: null,
	searchUser: []
};

export const loginUserAction = createAsyncThunk<
  string,
  loginDataProps,
  { rejectValue: string }
>("auth/loginUser", async (loginData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/signin`, loginData);
    console.log(data);

    localStorage.setItem("jwt", data.token);
    return data.token;
  } catch (error: any) {
    return rejectWithValue("Login failed");
  }
});

export const registerUserAction = createAsyncThunk<
  string,
  registerDataProps,
  { rejectValue: string }
>("auth/registerUser", async (registerData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/signup`, registerData);
    return data.token;
  } catch (error: any) {
    return rejectWithValue("Registration failed");
  }
});

export const getProfileAction = createAsyncThunk<
  UserProps,
  string,
  { rejectValue: string }
>("auth/users/profile", async (jwt, { rejectWithValue }) => {
  try {
    if (!jwt || jwt === "null") {
      return rejectWithValue("Invalid token");
    }

    const { data } = await api.get(`${BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  } catch (error: any) {
    return rejectWithValue("Profile fetch failed");
  }
});

export const updateProfileAction = createAsyncThunk<
  UserProps,
	Partial<UserProps>,
  { state: RootState; rejectValue: string }
>(
  "auth/users/profile/update",
  async (updateData, {  rejectWithValue }) => {
    try {
			
      const jwt = localStorage.getItem("jwt")
      const { data } = await api.put(`${BASE_URL}/api/users`, updateData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue("Profile update failed");
    }
  }
);

export const searchUserByQueryAction = createAsyncThunk<
  UserProps[],
	{query: string},
  { state: RootState; rejectValue: string }
>(
  "auth/searchUserById",
  async ({query}, {  rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE_URL}/api/users/search?query=${query}`);

      return data;
    } catch (error: any) {
      return rejectWithValue("searchUserByQueryAction  failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
		logout: (state) => {
			localStorage.removeItem("jwt")
			state.user = null
		}
	},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUserAction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.jwt = action.payload;
          state.error = null;
        }
      )
      .addCase(
        loginUserAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Login failed";
        }
      )
      .addCase(registerUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUserAction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.jwt = action.payload;
          state.error = null;
        }
      )
      .addCase(
        registerUserAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Registration failed";
        }
      )
      .addCase(getProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProfileAction.fulfilled,
        (state, action: PayloadAction<UserProps>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload;
        }
      )
      .addCase(updateProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProfileAction.fulfilled,
        (state, action: PayloadAction<UserProps>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload;
        }
      )
			.addCase(updateProfileAction.rejected, (state, action: PayloadAction<string | undefined>) => {
				state.loading = false;
				state.error = action.payload || "Update failed";
			})
      .addCase(searchUserByQueryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchUserByQueryAction.fulfilled,
        (state, action: PayloadAction<UserProps[]>) => {
          state.loading = false;
          state.error = null;
          state.searchUser = action.payload;
        }
      )
			.addCase(searchUserByQueryAction.rejected, (state, action: PayloadAction<string | undefined>) => {
				state.loading = false;
				state.error = action.payload || "searchUserByQuery failed";
			})
  },
});

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions

export const selectJwt = (state: RootState) => state.auth.jwt;
export const selectAuthStatus = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectCurrentUser = (state: RootState) => state.auth.user;
