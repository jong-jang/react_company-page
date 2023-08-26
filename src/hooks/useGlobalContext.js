import { createContext, useContext, useState } from 'react';

// 전역 컨텍스트 생성
export const GlobalContext = createContext();

// 전역으로 관리할 State값을 App에 전달해주는 커스텀 Provider 컴포넌트
export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);
	return <GlobalContext.Provider value={{ MenuOpen, setMenuOpen }}>{children}</GlobalContext.Provider>;
}

// 특정 컴포넌트에 전역 컨텍스트의 값을 자유롭게 호출하도록 useContext 훅을 커스텀훅으로 내보냄
export function useGlobalData() {
	const globalConetext = useContext(GlobalContext);
	return globalConetext;
}
