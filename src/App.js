import { Route, Switch } from 'react-router-dom';

import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Main from './components/main/Main';

import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Members from './components/sub/Members';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';
import Menu from './components/common/Menu';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
	const queryClient = new QueryClient();

	const menu = useRef(null);
	return (
		<QueryClientProvider client={queryClient}>
			<Switch>
				<Route exact path='/' render={() => <Main menu={menu} />} />
				<Route path='/' render={() => <Header type={'sub'} menu={menu} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/members' component={Members} />

			<Footer />
			<Menu ref={menu} />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
