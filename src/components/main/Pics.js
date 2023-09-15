import { memo } from 'react';

function Pics({ Scrolled, Pos }) {
	return (
		<section id='pics' className='myScroll'>
			<figure style={{ transform: `translate(${Scrolled - Pos}px) rotate(45deg)` }}>
				<img src={process.env.PUBLIC_URL + '/img/rocket.png'} alt="123" />
			</figure>
			<figure style={{ transform: `translate(${5000 - 2 *Scrolled}px) rotate(45deg)` }}>
				<img src={process.env.PUBLIC_URL + '/img/meteor1.png'} alt="123" />
			</figure>
			<figure style={{ transform: `translate(${3500 - Scrolled}px) rotate(45deg)` }}>
				<img src={process.env.PUBLIC_URL + '/img/meteor2.png'} alt="123" />
			</figure>
		</section>
	);
}

export default memo(Pics);
