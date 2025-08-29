import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeFeed: (state, {payload}) => {
            const newFeed = state.filter(feed => feed._id !== payload);
            return newFeed;
        }
    },
})

// Action creators are generated for each case reducer function
export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;