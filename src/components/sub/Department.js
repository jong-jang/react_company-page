import { useSelector } from 'react-redux';
import Layout from '../common/Layout';
// import { useEffect, useState } from 'react';

function Department() {
	// const [Mounted, setMounted] = useState(true);
	const Members = useSelector((store) => store.memberReducer.members);

	// useEffect(() => {
	// 	return () => setMounted(false);
	// }, [Mounted]);

	return (
		<Layout name={'Department'}>
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
