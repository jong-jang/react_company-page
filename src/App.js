import { Route, Switch } from 'react-router-dom';

import Footer from './components/common/Footer';
import Header from './components/common/Header';

import Banner from './components/main/Banner';
import Btns from './components/main/Btns';
import News from './components/main/News';
import Pics from './components/main/Pics';
import Vids from './components/main/Vids';
import Visual from './components/main/Visual';

import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Members from './components/sub/Members';
import Youtube from './components/sub/Youtube';
import './scss/style.scss';

function App() {
	return (
		<>
			{/* Switch내부에 중복되는 라우트 경로가 있을때 먼저나온 라우트를 채택하고 그 이후는 무시 */}
			<Switch>
				<Route exact path='/'>
					<Header type={'main'} />
					<Visual />
					<News />
					<Pics />
					<Vids />
					<Banner />
					<Btns />
				</Route>

				<Route path='/'>
					<Header type={'sub'} />
				</Route>
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/contact' component={Contact} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/members' component={Members} />

			<Footer />
		</>
	);
}

export default App;
