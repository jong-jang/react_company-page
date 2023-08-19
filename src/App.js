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
import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchFlickr } from './redux/flickrSlice';

function App() {
	const menu = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		// slice로부터 비동기 데이터 fetching후 액션객체를 반환받은뒤 바로 dispatch로 slice의 리듀서로 전달
		dispatch(fetchYoutube());
		dispatch(fetchFlickr({ type: 'user', user: '198837106@N07' }));
	}, [dispatch]);

	return (
		<>
			{/* Switch내부에 중복되는 라우트 경로가 있을때 먼저나온 라우트를 채택하고 그 이후는 무시 */}
			<Switch>
				<Route exact path='/' render={() => <Main menu={menu} />} />
				<Route path='/' render={() => <Header type={'sub'} menu={menu} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/contact' component={Contact} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/members' component={Members} />

			<Footer />
			<Menu ref={menu} />
		</>
	);
}

export default App;
