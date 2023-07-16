import Layout from '../common/Layout';
import { useRef, useEffect } from 'react';

function Contact() {
	const container = useRef(null);
	const { kakao } = window;
	const option = useRef({
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	});

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(container.current, option.current);
		const marker = new kakao.maps.Marker({
			position: option.current.center,
		});
		marker.setMap(mapInstance);
		return () => {};
	}, []);

	return (
		<Layout name={'Contact'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}

export default Contact;
