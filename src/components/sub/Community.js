import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';

function Community() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};
	const input = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);
	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);

	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		setPosts([{ title: input.current.value, content: textarea.current.value }, ...Posts]);
		alert('글 저장이 완료되었습니다.');
		resetForm();
	};

	const deletePost = (delIndex) => {
		if (!window.confirm('정말 해당 게시글을 삭제하겠습니까?')) return;
		setPosts(Posts.filter((_, idx) => idx !== delIndex));
	};

	const enableUpdate = (editIndex) => {
		// 수정모드 진입 함수 호출시 Allowed값이 true가 아니면 함수 중지
		if (!Allowed) return;
		// 일단 수정모드 기능이 실행되면 Allowed값을 false바꿔서 이후부터는 다시 수정모드로 진입되는 것을 방지
		setAllowed(false);
		setPosts(
			Posts.map((post, postIndex) => {
				if (editIndex === postIndex) post.enableUpdate = true;
				return post;
			})
		);
	};
	const disableUpdate = (editIndex) => {
		setPosts(
			Posts.map((post, postIndex) => {
				if (editIndex === postIndex) post.enableUpdate = false;
				return post;
			})
		);
		// 글수정취소 함수 호출시 Allowed값을 다시 true로 바꿔서 글수정 가능하게 처리
		setAllowed(true);
	};
	const updatePost = (editIndex) => {
		if (!editInput.current.value.trim() || !editTextarea.current.value.trim()) {
			return alert('수정할 제목과 본문을 모두 입력하세요.');
		}

		setPosts(
			Posts.map((post, postIndex) => {
				if (editIndex === postIndex) {
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					post.enableUpdate = false;
					setAllowed(true);
				}
				return post;
			})
		);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea cols='30' rows='3' placeholder='본문을 입력하세요' ref={textarea}></textarea>
				<br />

				<nav className='btnSet'>
					<button>cancel</button>
					<button onClick={createPost}>write</button>
				</nav>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								//수정모드
								<>
									<div className='txt'>
										<input type='text' defaultValue={post.title} ref={editInput} />
										<br />
										<textarea cols='30' rows='3' defaultValue={post.content} ref={editTextarea}></textarea>
									</div>

									<nav className='btnSet'>
										<button
											onClick={() => {
												disableUpdate(idx);
											}}
										>
											CANCLE
										</button>
										<button
											onClick={() => {
												updatePost(idx);
											}}
										>
											UPDATE
										</button>
									</nav>
								</>
							) : (
								//출력 모드
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>

									<nav className='btnSet'>
										<button onClick={() => enableUpdate(idx)}>EDIT</button>
										<button onClick={() => deletePost(idx)}>DELETE</button>
									</nav>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
