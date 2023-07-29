import Layout from '../common/Layout';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import { useState, useEffect } from 'react';

function Gallery() {
	const [Items, setItems] = useState([]);

	const getFlickr = async (opt) => {
		const key = '540e875989ee5c74090556f957686df1';
		const num = 20;
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
	};

	useEffect(() => {
		getFlickr({ type: 'interest' });
		//getFlickr({ type: 'search', tags: 'landscape' });
		//getFlickr({ type: 'user', user: '198837106@N07' });
	}, []);

	useEffect(() => {
		console.log(Items);
	}, [Items]);

	return (
		<Layout name={'Gallery'}>
			<div className='frame'>
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
										<span>{item.owner}</span>
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
