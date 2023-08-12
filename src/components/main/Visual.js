import { memo } from 'react';

function Visual() {
	return (
		<div id='visual' className='myScroll'>
			<div id='stars'></div>
			<div id='stars2'></div>
			<div id='stars3'></div>
			<div className='h_box'></div>
		</div>
	);
}

export default memo(Visual);
