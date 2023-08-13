import { useSelector } from 'react-redux';

function Pics({ Scrolled, Pos }) {
	const { flickr } = useSelector((store) => store.flickrReducer);
	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateX(${Scrolled - Pos}px)` }}>FLICKR</h1>
			{flickr.map((pic, idx) => {
				return <img key={idx} src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />;
			})}
		</section>
	);
}

export default Pics;
