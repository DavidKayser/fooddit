import { createSlice } from '@reduxjs/toolkit';

const redditsSlice = createSlice({
    name: 'reddits',
    initialState: {
        reddits: [
            {
                id: 1,
                community: "r/something",
                title: "Test Title",
                image: "https://i.redd.it/f6b7703uwko81.gif",
                author: "David K",
                authorImage: "https://b.thumbs.redditmedia.com/VUqn5Ks9yX4f4pbLMk6ESjN-1QuJSLr51YWBHXu_BIk.jpg",
                upvotes: "34.3k",
                postedOn: "Jan 2nd, 2012"
            },
            {
                id: 2,
                community: "r/somethingElse",
                title: "Test Title",
                image: "https://i.imgur.com/tdiOx5E.jpg",
                author: "David K",
                authorImage: "https://b.thumbs.redditmedia.com/VUqn5Ks9yX4f4pbLMk6ESjN-1QuJSLr51YWBHXu_BIk.jpg",
                upvotes: "3",
                postedOn: "Jan 2nd, 2012"
            }
        ]
    }
});

export const selectReddits = (state) => state.reddits.reddits;

export default redditsSlice.reducer;