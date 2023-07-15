import { useEffect, useRef } from 'react';

function Btns() {
	const btnRef = useRef(null);
	let pos = useRef([]);

	const getPos = () => {
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		console.log(pos.current);
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
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	);
}

export default Btns;
