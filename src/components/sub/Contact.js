import Layout from '../common/Layout';
import { useRef, useEffect, useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { useThrottle } from '../../hooks/useThrottle';

function Contact() {
	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(0);
	const [Location, setLocation] = useState(null);
	const container = useRef(null);
	const mapInstanceRef = useRef(null);
	const form = useRef(null);
	const inputName = useRef(null);
	const inputEmail = useRef(null);
	const textarea = useRef(null);
	const { kakao } = window;
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

	const setCenter = useCallback(() => {
		console.log('setCenter');
		Location.setCenter(info.current[Index].latlng);
	}, [Index, Location]);

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm('service_c8hl9f8', 'template_au1enk7', form.current, '23g8RepczesqKPoIX').then(
			(result) => {
				alert('메일전송에 성공했습니다.');
				inputName.current.value = '';
				inputEmail.current.value = '';
				textarea.current.value = '';
			},
			(error) => {
				alert('메일전송에 실패했습니다.');
				inputName.current.value = '';
				inputEmail.current.value = '';
				textarea.current.value = '';
			}
		);
	};

	useEffect(() => {
		container.current.innerHTML = '';
		const mapInstance = new kakao.maps.Map(container.current, { center: info.current[Index].latlng, level: 3 });
		setLocation(mapInstance);
		const markerImage = new kakao.maps.MarkerImage(info.current[Index].imgSrc, info.current[Index].imgSize, info.current[Index].imgPos);

		const marker = new kakao.maps.Marker({
			position: info.current[Index].latlng,
			image: markerImage,
		});

		marker.setMap(mapInstance);
		mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
		mapInstanceRef.current = mapInstance;
	}, [Index, kakao]);

	useEffect(() => {
		Traffic ? mapInstanceRef.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : mapInstanceRef.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, kakao]);

	useEffect(() => {
		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [setCenter]);
	return (
		<Layout name={'Contact'}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic ON' : 'Traffic OFF'}</button>

			<ul className='branch'>
				{info.current.map((el, idx) => {
					return (
						<li key={idx} className={idx === Index ? 'on' : ''} onClick={() => setIndex(idx)}>
							{el.title}
						</li>
					);
				})}
			</ul>

			<form ref={form} onSubmit={sendEmail}>
				<label>Name</label>
				<input type='text' name='user_name' ref={inputName} />
				<label>Email</label>
				<input type='email' name='user_email' ref={inputEmail} />
				<label>Message</label>
				<textarea name='message' ref={textarea} />
				<input type='submit' value='Send' />
			</form>
		</Layout>
	);
}

export default Contact;
