import { useRef, useEffect, useState } from 'react';
import Anime from '../../asset/anime';

function Btns() {
	const btnRef = useRef(null);
	let pos = useRef([]);
	const [Num, setNum] = useState(0);

	const getPos = () => {
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		setNum(pos.current.length);
	};

	const activation = () => {
		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		const boxs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		const base = -window.innerHeight / 2;

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const box of boxs) box.classList.remove('on');
				btns[idx].classList.add('on');
				boxs[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		window.scrollTo({ top: 0, behavior: 'smooth' });
		/*
		window객체 scrollTo를 써도 되지만
		콜백기능이 없음
		SPA이기 때문에 페이지 이동시에 스크롤위치가 그대로기 떄문에 새로고침시 상단으로 이동되게 할 필요가 있음 umount시에도 적용필요
		new Anime(window, {
			prop:'scroll',
			value: 0,
			duration:500,
		})
		*/

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
			window.scrollTo({ top: 0, behavior: 'smooth' });
		};
	}, []);

	return (
		<ul id='scroll_navi' ref={btnRef}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					let defaultClass = '';
					if (idx === 0) defaultClass = 'on';
					return (
						<li
							className={defaultClass}
							key={idx}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: 500,
								});
							}}
						></li>
					);
				})}
		</ul>
	);
}

export default Btns;
