import Layout from '../common/Layout';

function Community() {
	return (
		<Layout name={'Community'} bg={process.env.PUBLIC_URL + '/img/Community.jpg'}>
			{/* 공통의 컴포넌트 안쪽의 자식으로 입력한 children이라는 props명으로 자동으로 Layout컴포넌트에 전달 */}
			<p>Community 페이지 내용입니다</p>
		</Layout>
	);
}

export default Community;
