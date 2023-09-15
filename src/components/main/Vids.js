import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const { youtube } = useSelector((store) => store.youtubeReducer);
	return (
		<section id='vids' className='myScroll'>
			<h1>유튜브</h1>
			<div>
				{youtube.map((vid, idx) => {
					if (idx >= 3) return null;
					return (
						<article key={idx}>
							<p>{vid.snippet.title.length > 10 ? vid.snippet.title.substr(0, 10) + '...' : vid.snippet.title}</p>
							<img src={vid.snippet.thumbnails.standard.url} alt='썸네일' />
						</article>
					);
			})}
			</div>
		</section>
	);
}

export default memo(Vids);
