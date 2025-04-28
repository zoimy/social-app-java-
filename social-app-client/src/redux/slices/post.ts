import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api, BASE_URL } from "../../config/api";
import { RootState } from "../store";

export type UserProps = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
};

export type PostProps = {
  id: number;
  caption: string;
  image: string;
  video: string;
  gender: string;
  comments: CommentProps[];
  user: UserProps;
	liked: UserProps[]
	createdAt: string;
};

export type CommentProps = {
  postId: number;
  content: string;
  user: UserProps;
};

type PostState = {
  post: PostProps | null;
  posts: PostProps[] | null;
  loading: boolean;
  error: string | null;
  like: PostProps | null;
  comments: CommentProps[];
	newComment: CommentProps | null;
	liked: UserProps[] | null;
};

const initialState: PostState = {
  post: null,
  loading: false,
  error: null,
  posts: [],
  like: null,
  comments: [],
	newComment: null,
	liked: null
};

export const createPostAction = createAsyncThunk<
  PostProps,
  Partial<PostProps>,
  { rejectValue: string }
>("auth/createPost", async (postData, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`${BASE_URL}/api/posts/user`, postData);
    console.log(data);

    return data;
  } catch (error: any) {
    return rejectWithValue("CreatePost failed");
  }
});

export const getAllPostsAction = createAsyncThunk<
  PostProps[],
  void,
  { rejectValue: string }
>("auth/getAllPosts", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`${BASE_URL}/api/posts`);
    console.log(data);

    return data;
  } catch (error: any) {
    return rejectWithValue("getAllPosts failed");
  }
});

export const getUsersPostsAction = createAsyncThunk<
  PostProps[],
  { userId: number },
  { rejectValue: string }
>("auth/getUsersPosts", async ({ userId }, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`${BASE_URL}/api/posts/user/${userId}`);
    console.log(data);

    return data;
  } catch (error: any) {
    return rejectWithValue("getUsersPosts failed");
  }
});

export const likePostAction = createAsyncThunk<
  PostProps,
  { postId: number },
  { rejectValue: string }
>("auth/likePost", async ({ postId }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`${BASE_URL}/api/posts/like/${postId}`);
    console.log(data);

    return data;
  } catch (error: any) {
    return rejectWithValue("likePost failed");
  }
});

export const createCommentAction = createAsyncThunk<
  CommentProps,
  { postId: number; content: string },
  { rejectValue: string }
>("auth/createComment", async ({ postId, content }, { rejectWithValue }) => {
  try {
    const { data } = await api.post(`${BASE_URL}/api/comment/post/${postId}`, {
      content,
    });
    console.log(data);

    return data;
  } catch (error: any) {
    return rejectWithValue("createComment failed");
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createPostAction.fulfilled,
        (state, action: PayloadAction<PostProps>) => {
          state.loading = false;
          state.posts = [action.payload, ...(state.posts || [])];
          state.error = null;
        }
      )
      .addCase(
        createPostAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "createPost failed";
        }
      )
      .addCase(getAllPostsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPostsAction.fulfilled,
        (state, action: PayloadAction<PostProps[]>) => {
          state.loading = false;
          state.posts = action.payload;
          state.comments = action.payload.flatMap((post) => post.comments);
          state.error = null;
        }
      )
      .addCase(
        getAllPostsAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "getAllPosts failed";
        }
      )
      .addCase(getUsersPostsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUsersPostsAction.fulfilled,
        (state, action: PayloadAction<PostProps[]>) => {
          state.loading = false;
          state.posts = action.payload;
          state.error = null;
        }
      )
      .addCase(
        getUsersPostsAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "getUsersPosts failed";
        }
      )
      .addCase(likePostAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        likePostAction.fulfilled,
        (state, action: PayloadAction<PostProps>) => {
          state.loading = false;
          state.posts = (state.posts || []).map((item) =>
            item.id == action.payload.id ? action.payload : item
          );
          state.error = null;
        }
      )
      .addCase(
        likePostAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "likePost failed";
        }
      )
      .addCase(createCommentAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createCommentAction.fulfilled,
        (state, action: PayloadAction<CommentProps>) => {
          state.loading = false;
					state.newComment = action.payload 
          state.comments = [action.payload, ...state.comments]
          state.error = null;
        }
      )
      .addCase(
        createCommentAction.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "createComment failed";
        }
      );
  },
});

export const postReducer = postSlice.reducer;

export const selectPosts = (state: RootState) => state.post.posts;
export const selectPostLoading = (state: RootState) => state.post.loading;
export const selectPostError = (state: RootState) => state.post.error;
export const selectNewComment= (state: RootState) => state.post.newComment;
