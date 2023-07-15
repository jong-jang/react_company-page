import Header from '../common/Header';
import Banner from './Banner';
import Btns from './Btns';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';

import { useState } from 'react';

function Main() {
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);

	return (
		<main>
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics Scrolled={Scrolled} Pos={Pos[2]} />
			<Vids />
			<Banner />
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}

export default Main;
