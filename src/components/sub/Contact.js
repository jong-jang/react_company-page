import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';

function Contact() {
	const { kakao } = window;
	const [Traffic, setTraffic] = useState(false);
	const container = useRef(null);
	const mapInstanceRef = useRef(null);
	const option = useRef({
		center: new kakao.maps.LatLng(37.55554565158597, 126.9673777368895),
		level: 3,
	});

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(container.current, option.current);
		const markerImage = new kakao.maps.MarkerImage(`${process.env.PUBLIC_URL}/img/marker1.png`, new kakao.maps.Size(232, 99), { offset: new kakao.maps.Point(116, 99) });
		const marker = new kakao.maps.Marker({
			position: option.current.center,
			image: markerImage, // 마커이미지 설정
		});
		marker.setMap(mapInstance);
		mapInstanceRef.current = mapInstance;
	}, []);

	useEffect(() => {
		Traffic ? mapInstanceRef.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : mapInstanceRef.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Contact'}>
			<div id='map' ref={container}></div>
			<button
				onClick={() => {
					setTraffic(!Traffic);
				}}
			>
				{Traffic ? '교통정보 끄기' : '교통정보 보기'}
			</button>
		</Layout>
	);
}

export default Contact;
