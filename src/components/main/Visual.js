import React from 'react';

function Visual() {
	return (
		<figure id='visual' className='myScroll'>
			<video src={`${process.env.PUBLIC_URL}/img/vid.mp4`} muted loop autoPlay></video>
		</figure>
	);
}

export default Visual;
