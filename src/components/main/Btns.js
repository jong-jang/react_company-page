import { useEffect, useRef, useState } from 'react';

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

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		return () => {
			window.removeEventListener('resize', getPos);
		};
	}, []);

	return (
		<ul id='scroll_navi' ref={btnRef}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return <li key={idx}></li>;
				})}
		</ul>
	);
}

export default Btns;
