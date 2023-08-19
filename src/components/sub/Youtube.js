import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import Modal from '../common/Modal';
import { useSelector } from 'react-redux';

function Youtube() {
	const modal = useRef(null);
	const [Index, setIndex] = useState(0);

	const Vids = useSelector((store) => store.youtube.data);

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
