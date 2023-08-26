import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import { useState, useRef } from 'react';
import Modal from '../common/Modal';
import { useFlickrQuery } from '../../hooks/useFlickr';

function Gallery() {
	const openModal = useRef(null);
	const isUser = useRef(true);
	const enableEvent = useRef(null);
	const frame = useRef(null);
	const btnSet = useRef(null);
	const searchInput = useRef(null);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);
	const [Opt, setOpt] = useState({ type: 'user', user: '198837106@N07' });

	// 커스텀훅의 호출 위치 (컴포넌트안쪽에서 핸들러함수 없이 바로 호출)
	// 해당 커스텀훅을 각각의 이벤트핸들러 안쪽에서 호출할 수 없으니 전달되는 인수값을 State에 담아주고
	// 해당 state값을 이벤트핸들러 안쪽에서 변경처리 하면
	// 이벤트핸들러가 실행될때마다 컴포넌트는 재호출 되면서 달라진 Opt값으로 커스텀훅 함수가 자동호출 및 데이터 fetching
	const { data: Items, isSuccess } = useFlickrQuery(Opt);
	console.log(Items);

	const resetGallery = (e) => {
		isUser.current = false;
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');
		setLoader(true);
		frame.current.classList.remove('on');
	};

	/* 	const getFlickr = useCallback(
		async (opt) => {
			let counter = 0;
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
			if (result.data.photos.photo.length === 0) {
				setLoader(false);
				frame.current.classList.add('on');
				return alert('해당 키워드의 검색 결과가 없습니다.');
			}
			Mounted && setItems(result.data.photos.photo);

			const imgs = frame.current?.querySelectorAll('img');
			imgs?.forEach((img) => {
				img.onload = () => {
					++counter;
					if (counter === imgs.length - 2) {
						setLoader(false);
						frame.current.classList.add('on');
						setTimeout(() => {
							enableEvent.current = true;
						}, 500);
					}
				};
			});
		},
		[Mounted]
	); */

	const showInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		if (!enableEvent.current) return;
		enableEvent.current = false;
		resetGallery(e);
		setOpt({ type: 'interest' });
	};
	const showMine = (e) => {
		if (e.target.classList.contains('on')) return;
		if (!enableEvent.current) return;
		enableEvent.current = false;
		resetGallery(e);
		setOpt({ type: 'user', user: '198837106@N07' });
		isUser.current = true;
	};
	const showUser = (e) => {
		if (e.target.classList.contains('on')) return;
		if (!enableEvent.current) return;
		enableEvent.current = false;
		resetGallery(e);
		setOpt({ type: 'user', user: e.target.innerText });
		isUser.current = true;
	};
	const showSearch = (e) => {
		e.preventDefault();
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);
		setOpt({ type: 'search', tags: tag });
		searchInput.current.value = '';
	};

	return (
		<>
			<Layout name={'Gallery'}>
				<nav ref={btnSet}>
					<button onClick={showInterest}>Interest Gallery</button>
					<button className='on' onClick={showMine}>
						My Gallery
					</button>
				</nav>
				<div className='searchBox'>
					<form onSubmit={showSearch}>
						<input type='text' placeholder='검색어를 입력하세요' ref={searchInput} />
						<button>Search</button>
					</form>
				</div>
				{Loader && <img className='loader' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loader' />}
				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
						{isSuccess &&
							Items.map((item, idx) => {
								return (
									<article key={item.id}>
										<div className='inner'>
											<div className='pic'>
												<img
													src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
													alt={item.title}
													onClick={() => {
														openModal.current.open();
														setIndex(idx);
													}}
												/>
											</div>
											<h2>{item.title}</h2>

											<div className='profile'>
												<img
													src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
													alt={item.owner}
													onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
												/>
												<span
													onClick={(e) => {
														!isUser.current && showUser(e);
													}}
												>
													{item.owner}
												</span>
											</div>
										</div>
									</article>
								);
							})}
					</Masonry>
				</div>
			</Layout>
			<Modal ref={openModal}>{isSuccess && <img src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`} alt='' />}</Modal>
		</>
	);
}

export default Gallery;

/*  id, key
id  - 198837106@N07
key	- 540e875989ee5c74090556f957686df1
*/
