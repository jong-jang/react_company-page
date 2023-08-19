import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { close } from '../../redux/menuSlice';

function Menu() {
	const dispatch = useDispatch();
	//console.log(useSelector((store) => console.log(store)));
	const open = useSelector((store) => store.menu.open);
	console.log(open);
	const active = { color: 'hotpink', fontWeight: 'bold' };
	return (
		<AnimatePresence>
			{open && (
				<motion.nav
					id='mobilePanel'
					initial={{ x: '-100%', opacity: 0 }}
					animate={{ x: '0%', opacity: 1 }}
					exit={{ x: '-100%', opacity: 0 }}
					transition={{ duration: 0.5 }}
					onClick={() => dispatch(close())}
				>
					<h1>
						<Link to='/'>LOGO</Link>
					</h1>

					<ul id='gnbMo'>
						<li>
							<NavLink to='/department' activeStyle={active}>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeStyle={active}>
								Contact
							</NavLink>
						</li>
						<li>
							<NavLink to='/members' activeStyle={active}>
								Members
							</NavLink>
						</li>
					</ul>
				</motion.nav>
			)}
		</AnimatePresence>
	);
}

export default Menu;

/*
	Redux toolkit으로 client side data 전역관리 흐름
	createSlice로 리듀서 함수만 생성
	prop으로 reducers로 전역관리할 데이터 변경 함수를 등록
*/
