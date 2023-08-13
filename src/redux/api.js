// 외부 비동기 데이터를 fetching할 함수 모음 파일
import axios from 'axios';

export const fetchYoutube = async () => {
	const key = 'AIzaSyAsfSiK4NgpHz-QbJ48s9iUVg30JzSQ7rc';
	const list = 'PLJkDsZz0FhUkqKafhbfEQmjhSROZ1kiIl';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${list}&maxResults=${num}`;

	return await axios.get(url);
};
export const fetchMember = async () => {
	return await axios.get(`${process.env.PUBLIC_URL}/DB/members.json`);
};
