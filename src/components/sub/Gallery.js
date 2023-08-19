import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlickr } from '../../redux/flickrSlice';

function Gallery() {
	const dispatch = useDispatch();
	const openModal = useRef(null);
	const isUser = useRef(true);
	const enableEvent = useRef(null);
	const frame = useRef(null);
	const btnSet = useRef(null);
	const searchInput = useRef(null);
	const counter = useRef(0);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);
	const Items = useSelector((store) => store.flickr.data);

	const resetGallery = (e) => {
		isUser.current = false;
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');
		setLoader(true);
		frame.current.classList.remove('on');
	};

	const showInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		if (!enableEvent.current) return;
		enableEvent.current = false;
		resetGallery(e);
		dispatch(fetchFlickr({ type: 'interest' }));
	};
	const showMine = (e) => {
		if (e.target.classList.contains('on')) return;
		if (!enableEvent.current) return;
		enableEvent.current = false;
		resetGallery(e);
		dispatch(fetchFlickr({ type: 'user', user: '198837106@N07' }));
		isUser.current = true;
	};
	const showUser = (e) => {
		if (e.target.classList.contains('on')) return;
		if (!enableEvent.current) return;
		enableEvent.current = false;
		resetGallery(e);
		dispatch(fetchFlickr({ type: 'user', user: e.target.innerText }));
		isUser.current = true;
	};
	const showSearch = (e) => {
		e.preventDefault();
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);
		dispatch(fetchFlickr({ type: 'search', tags: tag }));
		searchInput.current.value = '';
	};
	useEffect(() => {
		counter.current = 0;
		const imgs = frame.current?.querySelectorAll('img');
		imgs?.forEach((img) => {
			img.onload = () => {
				++counter.current;
				console.log(counter.current);
				if (counter.current === imgs.length - 2) {
					setLoader(false);
					frame.current.classList.add('on');
					setTimeout(() => {
						enableEvent.current = true;
					}, 500);
				}
			};
		});
	}, [Items]);

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
						{Items.map((item, idx) => {
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
			<Modal ref={openModal}>
				<img src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`} alt='' />
			</Modal>
		</>
	);
}

export default Gallery;

/*  id, key
id  - 198837106@N07
key	- 540e875989ee5c74090556f957686df1
*/

/* gallery컴포넌트에 redux-toolkit으로 데이터가 변경되는흐름
	1. useSelector로 전역에있는 store데이터를 가져옴
	2. 이벤트 발생시 핸들러함수 안쪽에서 fetching함수로부터 action객체를 반환받고 dispatch로 slice 리듀서에 전달
	3. 전역에서 비동기 데이터가 변경되면 자동적으로 useSelector가 다시 새로운 데이터를 받아옴
	4. 받아지는 데이터를 의존성배열에 등록해서 useEffect를 호출
	5. 새로운 데이터로 갱신될때마다 useEffect가 실행되고 해당 구문에서 이미지 로딩이벤트 처리후 로딩 제거, 갤러리 출력
*/
