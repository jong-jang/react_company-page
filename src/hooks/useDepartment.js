import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchDepartment = async () => {
	const { data } = await axios.get(`${process.env.PUBLIC_URL}/DB/members.json`);
	return data.members;
};

export const useDepartmentQuery = () => {
	return useQuery(['departmentData'], fetchDepartment, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 60 * 24,
		cacheTime: 1000 * 60 * 60 * 24,
	});
};
