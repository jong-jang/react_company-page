import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	// 자식 컴포넌트 내부에서 만들어진 객체값을 역으로 부모 컴포넌트에 전달
	// 기존의 컴포넌트가 forwardRef로 감싸져있어야 함
	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	useEffect(() => {
		Open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [Open]);

	return (
		<>
			{Open && (
				<aside className='modal'>
					<div className='con'>{props.children}</div>
					<span
						className='close'
						onClick={() => {
							setOpen(false);
						}}
					>
						close
					</span>
				</aside>
			)}
		</>
	);
});

export default Modal;

/*
	useRef로 생성한 참조객체는 JSX는 참조 가능하나
	컴포넌트는 참조 불가
	- 해결방법은 참조하려고 하는 컴포넌트 내부에서 forwardRef를 이용해서 자기자신을 부모에게 역으로 참조객체에 담아서 전달

	forwardRef
	- 자식컴포넌트의 요소를 호출하는 부모컴포넌트에게 역으로 참조해서 전달

	useImperativeHandle
	- forwardRef문 안쪽에서 JSX를 역으로 반환하는것이 아닌 특정 객체를 반환처리
*/
