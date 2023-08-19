import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const { data } = useSelector((store) => store.youtube);
	console.log(data);
	return (
		<section id='vids' className='myScroll'>
			Vids
		</section>
	);
}

export default memo(Vids);
