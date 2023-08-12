import { useSelector } from 'react-redux';

function Footer() {
	const { members } = useSelector((store) => store.memberReducer);
	return (
		<footer>
			<h1>JJ</h1>
			<p>2023 JJAONG &copy; ALL RIGHTS RESERVED.</p>
			{/* 첫번째 랜더링시 members는 빈 배열이므로 콘솔오류 출력 : 옵셔널체이닝으로 해결 */}
			<p>{`This company was founded by ${members[0]?.name} in 1995`}</p>
		</footer>
	);
}

export default Footer;
