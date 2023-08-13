import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const { youtube } = useSelector((store) => store.youtubeReducer);
	return (
		<section id='vids' className='myScroll'>
			<h1>youtube</h1>
			{youtube.map((vid, idx) => {
				if (idx >= 5) return null;
				return (
					<article key={vid.id}>
						<h2>{vid.snippet.title}</h2>
					</article>
				);
			})}
		</section>
	);
}

export default memo(Vids);
