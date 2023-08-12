import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import Modal from '../common/Modal';
import { useSelector } from 'react-redux';

/* 
	비동기 서버사이드 데이터를 전역 관리하는 방법
	1. 초기 전역 state값을 일단 빈배열로 초기화
	2. 빈배열을 store에 담고 호출되게 처리
	3. 컴포넌트 마운트시 비동기데이터 fetching후 해당 데이터로 액션객체를 생성하고 dispatch로 리듀서에 전달
	4. 리듀서가 전역 store를 변경해주면서 자동으로 재랜더링이 일어나고 두번째 랜더링사이클에서 전역에 담겨있는 비동기 데이터 출력
*/

function Youtube() {
	const modal = useRef(null);
	const [Index, setIndex] = useState(0);
	const Vids = useSelector((store) => store.youtubeReducer.youtube);

	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((vid, idx) => {
					return (
						<article key={vid.id}>
							<h2>{vid.snippet.title.length > 50 ? vid.snippet.title.substr(0, 50) + '...' : vid.snippet.title}</h2>
							<div className='txt'>
								<p>{vid.snippet.description.length > 200 ? vid.snippet.description.substr(0, 200) + '...' : vid.snippet.description}</p>
								<span>{vid.snippet.publishedAt.split('T')[0].split('-').join('.')}</span>
							</div>
							<div
								className='pic'
								onClick={() => {
									modal.current.open();
									setIndex(idx);
								}}
							>
								<img src={vid.snippet.thumbnails.standard.url} alt='썸네일' />
							</div>
						</article>
					);
				})}
			</Layout>

			<Modal ref={modal}>
				<iframe title={Vids[Index]?.snippet.title} src={`https://www.youtube.com/embed/${Vids[Index]?.snippet.resourceId.videoId}`}></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
