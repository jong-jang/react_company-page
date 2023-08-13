// reducer에 middleware로 붙여서 비동기 데이터 fetching후 만들어신 action객체를 다시 reducer에 전달

/* 
  takeLatest: 액션요청이 들어오면 들어오는 액션요청중에 제일 최근 요청을 캐치
  takeEvery: 들어오는 액션요청을 모두 캐치  
  put :saga에서 새롭게 생선된 action객체를 리듀서에 전달해주는 함수(saga전용 dispatch)
  call: saga에서 api관련 함수 호출 (첫번째 인수:fetching함수, 두번째 인수: fetching함수의 인수로 전달)
  fork: 위에 함수들을 최종적으로 호출
  all: 여러가지 비동기 관련 saga함수를 병렬식으로 모두 호출

  작업호출
  1- 리듀서가 컴포넌트로부터 초기 action요청을 받으면 takeLatest로 해당 요청을 가져오는 함수를 정의
  2- api.js로 부터 fetching 함수를 가져와서 call로 호출하는 함수 정의
  3- 데이터 응답 성공유무에 따라서 서로 다른 액션객체를 생성해서 반환
  4- 이렇게 만들어진 한번에 호출해주는 함수 (fork, all)
  5- 위의 함수들을 saga단에서 단계에 맞게 동기화 호출할 수 있도록 제너레이터 함수로 제작
*/

import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchMember, fetchYoutube } from './api';
import * as types from './actionType';

function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}
function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.fail, payload: err });
	}
}

function* callMember() {
	yield takeLatest(types.MEMBER.start, returnMember);
}

function* returnMember() {
	try {
		const response = yield call(fetchMember);
		yield put({ type: types.MEMBER.success, payload: response.data.members });
	} catch (err) {
		yield put({ type: types.MEMBER.fail, payload: err });
	}
}

export default function* rootSaga() {
	yield all([fork(callYoutube), fork(callMember)]);
}
