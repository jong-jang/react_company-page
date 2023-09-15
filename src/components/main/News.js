import { useEffect, useRef, useState, memo } from 'react';

function News() {
	const dummy = useRef([
		{ title: '제목5', content: 'Here comes description in detail.Here comes description in detail.' },
		{ title: '제목4', content: 'Here comes description in detail.Here comes description in detail.' },
		{ title: '제목3', content: 'Here comes description in detail.Here comes description in detail.' },
		{ title: '제목2', content: 'Here comes description in detail.Here comes description in detail.' },
		{ title: '제목1', content: 'Here comes description in detail.Here comes description in detail.' },
	]);
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummy.current;
	};
	const [Posts] = useState(getLocalData());

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);
	return (
		<section id='news' className='myScroll'>
			<h2>소식</h2>
			<div>
				{Posts.map((post, idx) => {
					if (idx >= 4) return null;
					return (
						<article key={idx}>
							<h3>{post.title}</h3>
							<p>{post.content}</p>
						</article>
					);
				})}
			</div>
		</section>
	);
}

export default memo(News);
