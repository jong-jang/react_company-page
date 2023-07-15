function Pics({ Scrolled, Pos }) {
	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateY(${Scrolled - Pos}px)` }}>FLICKR</h1>
		</section>
	);
}

export default Pics;
