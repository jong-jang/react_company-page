import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
	name: 'menu',
	initialState: { open: false },
	reducers: {
		close: (state) => {
			state.open = false;
		},
		open: (state) => {
			state.open = true;
		},
		toggle: (state) => {
			state.open = !state.open;
		},
	},
});

export const { open, close, toggle } = menuSlice.actions;
export default menuSlice.reducer;
