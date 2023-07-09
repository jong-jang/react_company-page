import { forwardRef } from 'react';

const Modal = forwardRef((props, ref) => {
	return (
		<aside className='modal' ref={ref}>
			<div className='con'>
				<span className='close'>close</span>
			</div>
		</aside>
	);
});

export default Modal;

/*
	useRef로 생성한 참조객체는 JSX는 참조 가능하나
	컴포넌트는 참조 불가
	- 해결방법은 참조하려고 하는 컴포넌트 내부에서 forwardRef를 이용해서 자기자신을 부모에게 역으로 참조객체에 담아서 전달

	forwardRef
	- 자식컴포넌트의 요소를 호출하는 부모컴포넌트에게 역으로 참조해서 전달
*/
