import { memo } from 'react';

function Visual() {
	return (
		<div id='visual' className='myScroll'>
			<div id="stars"></div>
			<div id="stars2"></div>
			<div id="stars3"></div>
      <div className="h_box"><img src={`${process.env.PUBLIC_URL}/img/hum.png`} alt="사람" /></div>
		</div>
	);
}

export default memo(Visual);
