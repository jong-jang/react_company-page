import { useSelector, useDispatch } from 'react-redux';
import Layout from '../common/Layout';
// import { useEffect, useState } from 'react';
import { setMembers } from '../../redux/action';

function Department() {
	// const [Mounted, setMounted] = useState(true);
	const dispatch = useDispatch();
	const Members = useSelector((store) => store.memberReducer.members);

	// useEffect(() => {
	// 	return () => setMounted(false);
	// }, [Mounted]);

	return (
		<Layout name={'Department'}>
			<button
				onClick={() => {
					// 전역 데이터 변경시에는 참조형자료일때 기존 state값을 deep copy해서 변경
					const newMebers = [...Members];
					newMebers[0].name = 'Emma';
					dispatch(setMembers(newMebers));
				}}
			>
				대표자 이름 변경
			</button>
			{Members.map((member, idx) => {
				return (
					<article key={idx}>
						<div className='pic'>
							<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
							<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
						</div>
						<h2>{member.name}</h2>
						<p>{member.position}</p>
					</article>
				);
			})}
		</Layout>
	);
}

export default Department;
