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

export const fetchFlickr = async (opt) => {
	const key = '540e875989ee5c74090556f957686df1';
	const num = 50;
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${key}&per_page=${num}&safe_search=1`;
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const method_user = 'flickr.people.getPhotos';
	let url = '';
	if (opt.type === 'interest') url = `${baseURL}&method=${method_interest}`;
	if (opt.type === 'search') url = `${baseURL}&method=${method_search}&tags=${opt.tags}`;
	if (opt.type === 'user') url = `${baseURL}&method=${method_user}&user_id=${opt.user}`;

	return await axios.get(url);
};
