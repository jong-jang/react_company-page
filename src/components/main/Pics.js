import { memo } from 'react';
import { useSelector } from 'react-redux';

function Pics({ Scrolled, Pos }) {
	const Members = useSelector(store => store.memberReducer.members)

	return (
		<section id='pics' className='myScroll'>
			<h2>구성원</h2>
			<ul style={{transform:`translateX(${Scrolled - Pos -100}px)`}}>
				{Members.map((member, idx) => {
					return (
						<li key={idx}>
							<div className='pic'>
								<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
							</div>
							<h3>{member.name}</h3>
							<p>{member.position}</p>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default memo(Pics);
