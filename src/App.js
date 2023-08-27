import { Route, Switch } from 'react-router-dom';

import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Main from './components/main/Main';

import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Members from './components/sub/Members';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';
import Menu from './components/common/Menu';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

function App() {
	console.log('reren');
	const queryClient = new QueryClient();
	const [Count1, setCount1] = useState(0);
	const [Count2, setCount2] = useState(0);

	// 기존의 17 버전도 auto batching 기능이 적용됨
	// promise를 반환하는 함수 안쪽에서 복수개의 state가 변경될 경우에는 batching처리가 안됨
	const returnPromise = () => new Promise((res) => setTimeout(res, 500));

	const handleClick = () => {
		returnPromise().then(() => {
			setCount1(Count1 + 1);
			setCount2(Count2 + 2);
		});
	};

	return (
		<QueryClientProvider client={queryClient}>
			<Switch>
				<Route exact path='/' render={() => <Main />} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<div style={{ position: 'absolute', top: 0, left: 0, fontSize: 100, zIndex: 10, color: '#fff' }}>
				<button onClick={handleClick}>button</button>
				<h1>{Count1}</h1>
				<h1>{Count2}</h1>
			</div>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/members' component={Members} />

			<Footer />
			<Menu />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
