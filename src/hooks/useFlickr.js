import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchFlickr = async ({ queryKey }) => {
	const opt = queryKey[1];
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

	const { data } = await axios.get(url);
	return data.photos.photo;
};

export const useFlickrQuery = (opt) => {
	return useQuery(['flickrData', opt], fetchFlickr, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 60 * 24,
		cacheTime: 1000 * 60 * 60 * 24,
	});
};
