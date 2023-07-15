import Header from '../common/Header';
import Banner from './Banner';
import Btns from './Btns';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';

import { useEffect, useRef } from 'react';

function Main() {
	const main = useRef(null);
	let pos = useRef([]);

	const getPos = () => {
		pos.current = [];
		const secs = main.current.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		console.log(pos.current);
	};

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		return () => {
			window.removeEventListener('resize', getPos);
		};
	}, []);

	return (
		<main ref={main}>
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics />
			<Vids />
			<Banner />
			<Btns />
		</main>
	);
}

export default Main;
