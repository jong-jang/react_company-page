import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';
import { memo } from 'react';
import { toggle } from '../../redux/menuSlice';
import { useDispatch } from 'react-redux';

function Header({ type }) {
	const dispatch = useDispatch();
	const active = { color: 'hotpink', fontWeight: 'bold' };

	return (
		<header className={type}>
			<h1>
				<Link to='/'>LOGO</Link>
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

			<FontAwesomeIcon icon={faBars} onClick={() => dispatch(toggle())} />
		</header>
	);
}

export default memo(Header);
