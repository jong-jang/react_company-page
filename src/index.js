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
	redux-saga
	- 비동기 데이터의 호출 및 리듀서, 상태변경 관련 함수를 saga단에서 generator를 통해서 변경요청
	- 컴포넌트 외부에서 독립적으로 서버사이드 데이터를 전역관리하기 위한 라이브러리
	- 단점 : 과하게 중앙집중적인 전역데이터 관리 시스템, 관리할 비동기 데이터가 많아지면 코드가 복잡해서 관리의 어려움

	redux-thunk
	- 비동기 데이터 카테고리 별로 action객체 안에 api관련함수, 리듀서를 모두 객체에 등록해서 관리

	redux-toolkit
	- redux-thunk 기반으로 action객체를 편하게 생성해주는 통합 라이브러리
	- 기존의 액션객체생성을 데이터카테고리별로 slice파일 형태로 컴포넌트 외부에서 독립적으로 관리하는 시스템
	
*/
