import { authReducer } from './slices/auth';
import { configureStore } from '@reduxjs/toolkit';
import { postReducer } from './slices/post';
import { messageReducer } from './slices/message';


export const store = configureStore({
reducer: {
	auth: authReducer,
	post: postReducer,
	message: messageReducer,
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
