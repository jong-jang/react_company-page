import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Gallery() {
	const key = '540e875989ee5c74090556f957686df1';
	const num = 20;
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${key}&per_page=${num}`;
	const method_interest = 'flickr.interestingness.getList';
	const url_interest = `${baseURL}&method=${method_interest}`;
	const [Items, setItems] = useState([]);

	useEffect(() => {
		axios.get(url_interest).then((json) => {
			setItems(json.data.photos.photo);
		});
	}, []);

	useEffect(() => {
		console.log(Items);
	}, [Items]);

	return (
		<Layout name='Gallery'>
			<div className='frame'>
				{Items.map((item, idx) => {
					return (
						<article key={item.id}>
							<div className='inner'>
								<div className='pic'>
									<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`} />
								</div>
								<h2>{item.title}</h2>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Gallery;
