// 액션을 받아서 전역 스테이트를 변경해줄 변형자 함수
import { combineReducers } from 'redux';
import * as types from './actionType';

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		// 컴포넌트로부터 action객체를 받음
		// 해당 액션타입 요청을 saga단에서 가져가서
		// 비동기 데이터 처리후 action 객체 생성뒤 다시 리듀서에 전달
		case types.YOUTUBE.start:
			return state;
		// 사가에서 전달받은 action타입이 success면 payload에 담겨있는 비동기 데이터 반환값으로 전역 state변경
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };
		// 사가에서 전달받은 action타입이 fail면 payload에 담겨있는 에러객체로 전역 state변경
		case types.YOUTUBE.fail:
			return { ...state, youtube: action.payload };
		// 그 외 액션 타입에서는 기존 디폴트값 리턴
		default:
			return state;
	}
};

const reducers = combineReducers({ youtubeReducer });
export default reducers;
