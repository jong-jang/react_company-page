import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';
import Modal from '../common/Modal';

function Youtube() {
	const modal = useRef(null);
	const [Vids, setVids] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Mounted, setMounted] = useState(true);

	const fetchYoutube = useCallback(async () => {
		const key = 'AIzaSyAsfSiK4NgpHz-QbJ48s9iUVg30JzSQ7rc';
		const list = 'PLJkDsZz0FhUkqKafhbfEQmjhSROZ1kiIl';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${list}&maxResults=${num}`;

		const result = await axios.get(url);
		Mounted && setVids(result.data.items);
	}, [Mounted]);

	useEffect(() => {
		fetchYoutube();

		return () => {
			setMounted(false);
		};
	}, [fetchYoutube]);

	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((vid, idx) => {
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
									setIndex(idx);
								}}
							>
								<img src={vid.snippet.thumbnails.standard.url} alt='썸네일' />
							</div>
						</article>
					);
				})}
			</Layout>

			<Modal ref={modal}>
				<iframe title={Vids[Index]?.snippet.title} src={`https://www.youtube.com/embed/${Vids[Index]?.snippet.resourceId.videoId}`}></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
