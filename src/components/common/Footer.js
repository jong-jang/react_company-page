import { useSelector } from 'react-redux';

function Footer() {
	const { members } = useSelector((store) => store.memberReducer);
	return (
		<footer>
			<h1>JJ</h1>
			<p>2023 JJAONG &copy; ALL RIGHTS RESERVED.</p>
			<p>{`This company was founded by ${members[0].name} in 1995`}</p>
		</footer>
	);
}

export default Footer;
