// reducer에 middleware로 붙여서 비동기 데이터 fetching후 만들어신 action객체를 다시 reducer에 전달

/* 
  takeLatest: 액션요청이 들어오면 들어오는 액션요청중에 제일 최근 요청을 캐치
  takeEvery: 들어오는 액션요청을 모두 캐치  
  put :saga에서 새롭게 생선된 action객체를 리듀서에 전달해주는 함수(saga전용 dispatch)
  call: saga에서 api관련 함수 호출 (첫번째 인수:fetching함수, 두번째 인수: fetching함수의 인수로 전달)
  fork: 위에 함수들을 최종적으로 호출
  all: 여러가지 비동기 관련 saga함수를 병렬식으로 모두 호출
*/
