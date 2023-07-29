import Layout from '../common/Layout';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import { useState, useEffect, useRef } from 'react';

function Gallery() {
	const frame = useRef(null);
	const btnSet = useRef(null);
	const [Items, setItems] = useState([]);
	const [Loader, setLoader] = useState(true);

	const resetGallery = (e) => {
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');
		setLoader(true);
		frame.current.classList.remove('on');
	};

	const getFlickr = async (opt) => {
		let counter = 0;
		const key = '540e875989ee5c74090556f957686df1';
		const num = 50;
		const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${key}&per_page=${num}`;
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';
		let url = '';
		if (opt.type === 'interest') url = `${baseURL}&method=${method_interest}`;
		if (opt.type === 'search') url = `${baseURL}&method=${method_search}&tags=${opt.tags}`;
		if (opt.type === 'user') url = `${baseURL}&method=${method_user}&user_id=${opt.user}`;

		const result = await axios.get(url);
		setItems(result.data.photos.photo);

		const imgs = frame.current.querySelectorAll('img');
		imgs.forEach((img) => {
			img.onload = () => {
				++counter;

				if (counter === imgs.length - 2) {
					setLoader(false);
					frame.current.classList.add('on');
				}
			};
		});
	};

	useEffect(() => {
		//getFlickr({ type: 'interest' });
		//getFlickr({ type: 'search', tags: 'landscape' });
		getFlickr({ type: 'user', user: '198837106@N07' });
	}, []);

	return (
		<Layout name={'Gallery'}>
			<nav ref={btnSet}>
				<button
					onClick={(e) => {
						if (e.target.classList.contains('on')) return;
						resetGallery(e);
						getFlickr({ type: 'interest' });
					}}
				>
					Interest Gallery
				</button>
				<button
					className='on'
					onClick={(e) => {
						if (e.target.classList.contains('on')) return;
						resetGallery(e);
						getFlickr({ type: 'user', user: '198837106@N07' });
					}}
				>
					My Gallery
				</button>
			</nav>
			{Loader && <img className='loader' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loader' />}
			<div className='frame' ref={frame}>
				<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
					{Items.map((item) => {
						return (
							<article key={item.id}>
								<div className='inner'>
									<div className='pic'>
										<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`} />
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
												if (e.target.classList.contains('on')) return;
												resetGallery(e);
												getFlickr({ type: 'user', user: e.target.innerText });
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
	);
}

export default Gallery;

// 540e875989ee5c74090556f957686df1
// 198837106@N07
