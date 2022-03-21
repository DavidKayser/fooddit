import { createSlice } from '@reduxjs/toolkit';

const redditsSlice = createSlice({
    name: 'reddits',
    initialState: {
        reddits: [
            {
                id: 1,
                title: "Test Title",
                image: "https://b.thumbs.redditmedia.com/VUqn5Ks9yX4f4pbLMk6ESjN-1QuJSLr51YWBHXu_BIk.jpg",
                author: "David K",
                authorImage: "https://b.thumbs.redditmedia.com/VUqn5Ks9yX4f4pbLMk6ESjN-1QuJSLr51YWBHXu_BIk.jpg",
                postedOn: "Jan 2nd, 2012"
            },
            {
                id: 2,
                title: "Test Title",
                image: "https://b.thumbs.redditmedia.com/VUqn5Ks9yX4f4pbLMk6ESjN-1QuJSLr51YWBHXu_BIk.jpg",
                author: "David K",
                authorImage: "https://b.thumbs.redditmedia.com/VUqn5Ks9yX4f4pbLMk6ESjN-1QuJSLr51YWBHXu_BIk.jpg",
                postedOn: "Jan 2nd, 2012"
            }
        ]
    }
});

export const selectReddits = (state) => state.reddits.reddits;

export default redditsSlice.reducer;