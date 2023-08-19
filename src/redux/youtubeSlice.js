// 비동기 데이터 fecthing 함수 등록
// 비동기 데이터의 상태에 따라 자동으로 액션타입을 전달받고 전역데이터를 변경해주는 리듀서 등록
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 비동기 서버통신으로 데이터를 전달받아서 내부적으로 action타입을 자동생성해서 액션객체 생성까지 완료하는 함수
export const fetchYoutube = createAsyncThunk('youtube/requestYoutube', async () => {
	const key = 'AIzaSyAsfSiK4NgpHz-QbJ48s9iUVg30JzSQ7rc';
	const list = 'PLJkDsZz0FhUkqKafhbfEQmjhSROZ1kiIl';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${list}&maxResults=${num}`;

	const result = await axios.get(url);
	return result.data.items;
});

// createAsyncThunk가 반환하는 action객체를 받아서 전역데이터를 변경해주는 리듀서 함수 등록
const youtubeSlice = createSlice({
	name: 'youtube',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchYoutube.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchYoutube.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchYoutube.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default youtubeSlice.reducer;
