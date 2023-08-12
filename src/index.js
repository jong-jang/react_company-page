import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById('root')
);
/*
 Redux 비동기데이터 전역관리 작업흐름
	- 컴포넌트에서 axios데이터 요청을 해서 반환된 결과값을 action객체로 담아서 dispatch로 리듀서에 전달
	- 리듀서는 해당 action 객체의 타입에 따라 전역데이터를 변형한뒤 store에 전달
	- 스토어는 리듀서로부터 전달받은 state정보값을 저장하고 Provider로 루트컴포넌트인 App에 전달
	- 각 컴포넌트에서는 userSelector를 통해서 자유롭게 전역 state값을 호출가능
	- 자식 컴포넌트에서 리듀서에 전역 state값 변경요청을 할때는 변경사항을 다시 action객체에 담아서 dispatch로 전달

	단점
	- 각각 컴포넌트에서 관리해야되는 비동기데이터가 많아지면서 api서버통신 함수 관리가 어려워짐
	- 비동기 데이터가 빈번하게 변경요청을 해당되면 코드 로직이 비효율적
	- 비동기데이터의 요청 성공, 실패 등의 상황에 대한 관리가 불가

	Redux-saga 작업흐름
	- 기존 리듀서의 액션타입에 따른 분기처리를 요청시작, 요청성공, 응답성공, 응답실패 등으로 세분화처리
	- 리듀서에서 중간 saga작업을 미들웨어로 연결해서 스토어에 데이터를 전달하기전 saga단에서 비동기 상태관리 처리
	- 기존처럼 컴포넌트에서 axios요청을 함수를 만들어서 관리하는 것이 아닌 api요청함수를 순수함수 형태로 컴포넌트 외부에서 따로 관리
	- 컴포넌트에서 api요청 필요시 action타입만 전달하면 그 작업을 saga가 미들웨어로 중간에 가로채서 순수함수형태의 비동기 함수 호출
	- saga단에서 fetching된 결과값을 액션객체로 만들어서 다시 리듀서에 전달
	- 리듀서는 사가가 전달해준 새로운 액션객체로 store에 전역 데이터 전달
*/
