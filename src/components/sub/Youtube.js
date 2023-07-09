import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';

function Youtube() {
	const modal = useRef(null);
	const [Vids, setVids] = useState([]);

	useEffect(() => {
		const key = 'AIzaSyAsfSiK4NgpHz-QbJ48s9iUVg30JzSQ7rc';
		const list = 'PLJkDsZz0FhUkqKafhbfEQmjhSROZ1kiIl';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${list}&maxResults=${num}`;

		axios.get(url).then((data) => {
			setVids(data.data.items);
			console.log(Vids);
		});
	}, []);

	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((vid) => {
					return (
						<article key={vid.id}>
							<h2>{vid.snippet.title.length > 50 ? vid.snippet.title.substr(0, 50) + '...' : vid.snippet.title}</h2>
							<div className='txt'>
								<p>{vid.snippet.description.length > 200 ? vid.snippet.description.substr(0, 200) + '...' : vid.snippet.description}</p>
								<span>{vid.snippet.publishedAt.split('T')[0].split('-').join('.')}</span>
							</div>
							<div
								className='pic'
								onClick={() => {
									modal.current.open();
								}}
							>
								<img src={vid.snippet.thumbnails.standard.url} alt='썸네일' />
							</div>
						</article>
					);
				})}
			</Layout>

			<Modal ref={modal} />
		</>
	);
}

export default Youtube;
