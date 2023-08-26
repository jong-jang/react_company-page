import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchYoutube = async () => {
	const key = 'AIzaSyAsfSiK4NgpHz-QbJ48s9iUVg30JzSQ7rc';
	const list = 'PLJkDsZz0FhUkqKafhbfEQmjhSROZ1kiIl';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${list}&maxResults=${num}`;

	const { data } = await axios.get(url);
	return data.items;
};

export const useYoutubeQuery = () => {
	return useQuery(['youtubeData'], fetchYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 5,
		cacheTime: 1000 * 5,
	});
};
