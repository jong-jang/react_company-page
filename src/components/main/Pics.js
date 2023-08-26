import { useFlickrQuery } from '../../hooks/useFlickr';

function Pics({ Scrolled, Pos }) {
	const { data, isSuccess } = useFlickrQuery({ type: 'user', user: '198837106@N07' });

	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateX(${Scrolled - Pos}px)` }}>FLICKR</h1>
			{isSuccess &&
				data.map((el, idx) => {
					if (idx >= 5) return null;
					return <p key={idx}>{el.title}</p>;
				})}
		</section>
	);
}

export default Pics;
