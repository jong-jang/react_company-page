import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	useEffect(() => {
		Open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [Open]);

	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='modal'
					initial={{ opacity: 0, x: '100%' }}
					animate={{ opacity: 1, transition: { duration: 0.5 }, x: '0%' }}
					exit={{ opacity: 0, scale: 0, transition: { duration: 0.5, delay: 0.5 }, x: '-100%' }}
				>
					<motion.div className='con' initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }} exit={{ opacity: 0, transition: { duration: 0.5, delay: 0 } }}>
						{props.children}
					</motion.div>
					<motion.span
						className='close'
						onClick={() => {
							setOpen(false);
						}}
						initial={{ opacity: 0, scale: 5 }}
						animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5 } }}
						exit={{ scale: 5, opacity: 0, transition: { duration: 0.5, delay: 0 } }}
					>
						close
					</motion.span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Modal;
