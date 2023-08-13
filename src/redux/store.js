// reducer에 saga미들웨어 적용
// saga가 적용된 reducer가 반환된 데이터를 전역객체로 만들어서 리턴
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import rootSaga from './saga';
import createSagaMiddleware from '@redux-saga/core';

// saga전용 미들웨어 객체 활성화 (해당객체로부터 run메서드로 saga내보내고 있는 rootSaga함수 호출)
const sagaMiddleware = createSagaMiddleware();

// store생성시 리덕스의 applyMiddleware함수를 호출해서 sagaMiddleware 적용가능하도록 설정
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

// saga middleware의 run함으로 rootSaga 호출
sagaMiddleware.run(rootSaga);

// saga에서 전달된 데이터가 reducer에 의해서 전역 state가 변경되고 변경된 전역 state값이 store로 내보내짐
export default store;
