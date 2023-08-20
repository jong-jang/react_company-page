// 비동기 데이터 fecthing 함수 등록
// 비동기 데이터의 상태에 따라 자동으로 액션타입을 전달받고 전역데이터를 변경해주는 리듀서 등록
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 비동기 서버통신으로 데이터를 전달받아서 내부적으로 action타입을 자동생성해서 액션객체 생성까지 완료하는 함수
export const fetchFlickr = createAsyncThunk('flickr/requestFlickr', async (opt) => {
	const key = '540e875989ee5c74090556f957686df1';
	const num = 30;
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${key}&per_page=${num}&safe_search=1`;
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const method_user = 'flickr.people.getPhotos';
	let url = '';
	if (opt.type === 'interest') url = `${baseURL}&method=${method_interest}`;
	if (opt.type === 'search') url = `${baseURL}&method=${method_search}&tags=${opt.tags}`;
	if (opt.type === 'user') url = `${baseURL}&method=${method_user}&user_id=${opt.user}`;

	const result = await axios.get(url);

	return result.data.photos.photo;
});

// createAsyncThunk가 반환하는 action객체를 받아서 전역데이터를 변경해주는 리듀서 함수 등록
const flickrSlice = createSlice({
	name: 'flickr',
	initialState: {
		data: [],
		isLoading: false,
	},
	extraReducers: {
		[fetchFlickr.pending]: (state) => {
			state.isLoading = true;
		},
		[fetchFlickr.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchFlickr.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
	},
});

export default flickrSlice.reducer;
