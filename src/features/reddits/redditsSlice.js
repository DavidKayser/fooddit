import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadReddits = createAsyncThunk('reddits/loadReddits', async () => {
    const response = await fetch(`https://www.reddit.com/r/popular.json`);
    const json = await response.json();
    const posts =  json.data.children.map((reddit) => {
        const postData = {
            id: reddit.data.id,
            subreddit: reddit.data.subreddit_name_prefixed,
            title: reddit.data.title,
            mediaType: reddit.data.post_hint,
            media: reddit.data.url_overridden_by_dest,
            author: reddit.data.author,
            authorImage: reddit.data.id,
            upvotes: reddit.data.ups,
            postedOn: reddit.data.created_utc,
            numberOfComments: reddit.data.num_comments
        }
        return postData;
    });
    return posts;
});

const redditsSlice = createSlice({
    name: 'reddits',
    initialState: {
        reddits: [],
        avatars: [],
        isLoadingReddits: false,
        failedToLoadReddits: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            //loading reddits
            .addCase(loadReddits.pending, (state) => {
                state.isLoadingReddits = true;
                state.failedToLoadReddits = false;
            })
            .addCase(loadReddits.fulfilled, (state, action) => {
                state.isLoadingReddits = false;
                state.failedToLoadReddits = false;
                state.reddits = action.payload;
            })
            .addCase(loadReddits.rejected, (state) => {
                state.isLoadingReddits = false;
                state.failedToLoadReddits = true;
                state.reddits = [];
            })
    }
});

export const selectReddits = (state) => state.reddits.reddits;
export const selectIsLoading = (state) => state.reddits.isLoadingReddits;

export default redditsSlice.reducer;