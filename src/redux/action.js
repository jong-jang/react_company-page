// 인수로 전달된 값을 payload에 담아서 액션객체를 반환하는 함수를 export
// 해당 함수를 추후 컴포넌트에서 호출될 예정

export const setMembers = (data) => {
	return {
		type: 'SET_MEMBERS',
		payload: data,
	};
};

export const setYoutube = (data) => {
	return {
		type: 'SET_YOUTUBE',
		payload: data,
	};
};
