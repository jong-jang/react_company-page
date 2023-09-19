import { combineReducers } from 'redux';

//초기 state값을 지정하고 추후 action객체가 넘어오면 action타입에 따라 전역 state값을 변경해주는 변형자 함수
const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};
const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

//해당 변형자함수가 반환하는 리턴값을 하나의 객체로 합쳐서 외부로 export
const reducer = combineReducers({ memberReducer, youtubeReducer });
export default reducer;
