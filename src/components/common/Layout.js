import { useEffect, useRef } from 'react';

function Layout({ name, children }) {
	const frame = useRef(null);

	useEffect(() => {
		const copy = frame.current;
		copy.classList.add('on');
		return () => {
			// 컴포넌트가 언마운트시에 동작되는 함수이므로 가상돔이 담겨있는 참조객체를 해당 함수안쪽에서 활용 불가
			// 가상돔 요소를 활용하고 싶을땐 useEffect 안쪽에 변수를 만들어서 해당 변수에 useRef참조값을 복사하면 활용은 가능
			// 컴포넌트가 사라질때 가상돔 제어를 위해서는 추후 배울 forwardRef를 활용해야 함
			// copy.classList.remove('on')
		};
	}, []);
	return (
		<section className={`content ${name}`} ref={frame}>
			<figure style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/${name}.jpg)`}}></figure>
			<div className='inner'>
				<h1>{name}</h1>
				{children}
			</div>
		</section>
	);
}

export default Layout;
