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
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setYoutube, setMembers, setGallery } from './redux/action';

function App() {
	// 비동기 데이터를 전역객체에 저장하는것 자체가 여러컴포넌트에서 해당 값을 재활용하기 위함이므로
	// data fetching자체를 특정 컴포넌트가 아닌 루트컴포넌트에서 한번에 처리해서 전역에 담아놓고
	// 원하는 컴포넌트에 자유롭게 호출
	const dispatch = useDispatch();
	const menu = useRef(null);

	const fetchYoutube = useCallback(async () => {
		const key = 'AIzaSyAsfSiK4NgpHz-QbJ48s9iUVg30JzSQ7rc';
		const list = 'PLJkDsZz0FhUkqKafhbfEQmjhSROZ1kiIl';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${list}&maxResults=${num}`;

		const result = await axios.get(url);
		dispatch(setYoutube(result.data.items));
	}, [dispatch]);

	const fetchMembers = useCallback(async () => {
		const result = await axios.get(process.env.PUBLIC_URL + '/DB/members.json');
		dispatch(setMembers(result.data.members));
	}, [dispatch]);

	const fetchGallery = useCallback(async (opt) => {
			const key = '540e875989ee5c74090556f957686df1';
			const num = 50;
			const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${key}&per_page=${num}&safe_search=1`;
			const method_interest = 'flickr.interestingness.getList';
			const method_search = 'flickr.photos.search';
			const method_user = 'flickr.people.getPhotos';
			let url = '';
			if (opt.type === 'interest') url = `${baseURL}&method=${method_interest}`;
			if (opt.type === 'search') url = `${baseURL}&method=${method_search}&tags=${opt.tags}`;
			if (opt.type === 'user') url = `${baseURL}&method=${method_user}&user_id=${opt.user}`;

			const result = await axios.get(url);
			dispatch(setGallery(result.data.photos.photo))
	}, [dispatch])

	useEffect(() => {
		fetchYoutube();
		fetchMembers();
		fetchGallery({ type: 'user', user: '198837106@N07' });
	}, [fetchYoutube, fetchMembers, fetchGallery]);

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
