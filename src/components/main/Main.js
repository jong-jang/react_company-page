import Header from '../common/Header';
import Banner from './Banner';
import Btns from './Btns';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';

function Main() {
	return (
		<main>
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
