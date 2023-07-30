import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import Menu from './Menu';
import { useRef } from 'react';

function Header({ type }) {
	const toggleMenu = useRef(null);
	const active = { color: 'hotpink', fontWeight: 'bold' };
	return (
		<>
			<header className={type}>
				<h1>
					<Link to='/'>HOHO</Link>
				</h1>
				<ul id='gnb'>
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

				<FontAwesomeIcon
					icon={faBars}
					onClick={() => {
						toggleMenu.current.toggle();
					}}
				/>
			</header>
			<Menu ref={toggleMenu}></Menu>
		</>
	);
}

export default Header;
