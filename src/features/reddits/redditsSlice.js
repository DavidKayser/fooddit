import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import redditApi from '../../api/reddit-api';


//Run API call and trim function
export const loadReddits = createAsyncThunk('reddits/loadReddits', async (topic) => {
    const response = await redditApi(topic);
    let loadNext = "";
    if (response.data.after !== null) {
        loadNext = response.data.after;
    }
    const posts =  response.data.children;
    //filter posts without images
    const filteredPosts = posts.filter(post => post.data.post_hint === "image");
    const trimmedReddit = filteredPosts.map((reddit) => {
        const postData = {
            loadNext: loadNext,
            id: reddit.data.id,
            subreddit: reddit.data.subreddit_name_prefixed,
            title: reddit.data.title,
            mediaType: reddit.data.post_hint,
            media: reddit.data.url_overridden_by_dest,
            author: reddit.data.author,
            upvotes: reddit.data.ups,
            postedOn: reddit.data.created_utc,
            numberOfComments: reddit.data.num_comments,
            singleLink: reddit.data.permalink
        }
        return postData;
    });
    return trimmedReddit;
});

const redditsSlice = createSlice({
    name: 'reddits',
    initialState: {
        reddits: [],
        pageNumber: 0,
        isLoadingReddits: false,
        failedToLoadReddits: false,
        allLoaded: false
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
                state.reddits = state.reddits.concat(action.payload);
            })
            .addCase(loadReddits.rejected, (state) => {
                state.isLoadingReddits = false;
                state.failedToLoadReddits = true;
            })
    }
});

export const selectReddits = (state) => state.reddits.reddits;
export const selectIsLoading = (state) => state.reddits.isLoadingReddits;

export default redditsSlice.reducer;