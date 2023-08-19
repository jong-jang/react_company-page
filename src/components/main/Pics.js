import { memo } from 'react';
import { useSelector } from 'react-redux';

function Pics({ Scrolled, Pos }) {
	const { data } = useSelector((store) => store.flickr);
	console.log(data);
	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateX(${Scrolled - Pos}px)` }}>FLICKR</h1>
		</section>
	);
}

export default memo(Pics);
