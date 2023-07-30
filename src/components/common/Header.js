import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';

function Header({ type, menu }) {
	const active = { color: 'hotpink', fontWeight: 'bold' };
	return (
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
					menu.current.toggle();
				}}
			/>
		</header>
	);
}

export default Header;
