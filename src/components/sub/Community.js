import { useRef, useState, useEffect } from 'react';
import Layout from '../common/Layout';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);

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
		setPosts(
			Posts.map((post, postIndex) => {
				if (editIndex === postIndex) post.enableUpdate = true;
				return post;
			})
		);
	};

	useEffect(() => {
		console.log(Posts);
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
									<p>수정모드 출력</p>
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

/*
	Create - 데이터저장 (게시글 저장)
	Read - 데이터호출 (게시글 보기)
	Update - 데이터수정 (게시글 수정)
	Delete - 데이터삭제 (게시글 삭제)

	localStorage: 모든 브라우저가 가지고 있는 경량의 저장소 (문자열 : 5MB)

	수정 모드 작업 흐름
	1- 수정 버튼 클릭시 해당순번의 Post객체에 수정관련 property추가
	2- map으로 반복처리시 수정관련 propery유무에 따라 수정모드, 출력모드 구분해서 렌더링 처리
	3- 출력모드: h2, p로 출력 / 수정모드: input, textarea에 수정될값을 담아서 출력 (수정취소, 수정 버튼 추가)
	4- 수정모드에 수정버튼 클릭시 State값을 최종적으로 변경하고 해당 Post객체의 수정관련 property값을 출력모드로 변경
*/
