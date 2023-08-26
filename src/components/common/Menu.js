import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { useGlobalData } from '../../hooks/useGlobalContext';

function Menu() {
	const active = { color: 'hotpink', fontWeight: 'bold' };
	const { MenuOpen, setMenuOpen } = useGlobalData();

	return (
		<AnimatePresence>
			{MenuOpen && (
				<motion.nav
					id='mobilePanel'
					initial={{ x: '-100%', opacity: 0 }}
					animate={{ x: '0%', opacity: 1 }}
					exit={{ x: '-100%', opacity: 0 }}
					transition={{ duration: 0.5 }}
					onClick={() => setMenuOpen(false)}
				>
					<h1>
						<Link to='/'>HOHO</Link>
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
							<NavLink to='/members' activeStyle={active}>
								Members
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeStyle={active}>
								Contact
							</NavLink>
						</li>
					</ul>
				</motion.nav>
			)}
		</AnimatePresence>
	);
}

export default Menu;
