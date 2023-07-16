import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
	const { kakao } = window;
	const [Traffic, setTraffic] = useState(false);
	const container = useRef(null);
	const mapInstanceRef = useRef(null);
	const [Index, setIndex] = useState(0);
	const info = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	]);
	// 이메일 폼
	const form = useRef();

	// 이메일
	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm('service_k3i1dzt', 'template_14vftwr', form.current, 'x2uVyDYwL20EXj8_v').then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
	};

	useEffect(() => {
		container.current.innerHTML = '';
		const mapInstance = new kakao.maps.Map(container.current, { center: info.current[Index].latlng, level: 3 });
		const markerImage = new kakao.maps.MarkerImage(info.current[Index].imgSrc, info.current[Index].imgSize, info.current[Index].imgPos);
		const marker = new kakao.maps.Marker({
			position: info.current[Index].latlng,
			image: markerImage,
		});
		marker.setMap(mapInstance);
		mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
		mapInstanceRef.current = mapInstance;

		const setCenter = () => {
			var moveLatLon = info.current[Index].latlng;
			mapInstance.setCenter(moveLatLon);
		};

		window.addEventListener('resize', setCenter);
		return () => {
			window.removeEventListener('resize', setCenter);
		};
	}, [Index]);

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

			<ul className='branch'>
				{info.current.map((el, idx) => {
					return (
						<li
							key={idx}
							className={idx === Index ? 'on' : ''}
							onClick={() => {
								setIndex(idx);
								idx !== Index && setTraffic(false);
							}}
						>
							{el.title}
						</li>
					);
				})}
			</ul>

			<form ref={form} onSubmit={sendEmail}>
				<label>이름</label>
				<input type='text' name='user_name' />
				<label>이메일</label>
				<input type='email' name='user_email' />
				<label>내용</label>
				<textarea name='message' />
				<input type='submit' value='Send' />
			</form>
		</Layout>
	);
}

export default Contact;
