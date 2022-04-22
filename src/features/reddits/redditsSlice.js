import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import redditApi from '../../api/reddit-api';


//Run API call and trim function
export const loadReddits = createAsyncThunk('reddits/loadReddits', async (loadData) => {
    const {link, queryType } = loadData;
    const response = await redditApi(link);
    
    switch(queryType) {
        case "full":
            if (response.data.children.length <= 0) {
                return [queryType, [{}]];
            }
            break;
        case "single":
            if (response[0].data.children.length <= 0) {
                return [queryType, [{}]];
            }
            break;
        case "search":
            if (response.data.children.length <= 0) {
                return [queryType, [{}]];
            }
            break;
        default:
            console.log("could not get queryType");
    }
    let loadNext = response.data.after;

    let posts;

    if (queryType === "single") {
        posts = response[0].data.children;
    } else {
        // if (response.data.after !== null) {
        //     loadNext = response.data.after;
        // }
        posts = response.data.children;
    } 
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
            mediaDimensions: {width: reddit.data.preview.images[0].source.width, height: reddit.data.preview.images[0].source.height},
            author: reddit.data.author,
            upvotes: reddit.data.ups,
            postedOn: reddit.data.created_utc,
            numberOfComments: reddit.data.num_comments,
            singleLink: reddit.data.permalink,
            flair: reddit.data.link_flair_text
        }
        return postData;
    });
    return [queryType, trimmedReddit];
});

const redditsSlice = createSlice({
    name: 'reddits',
    initialState: {
        reddits: [],
        loadMore: "",
        singleReddit: null,
        filter: null,
        isLoadingReddits: false,
        failedToLoadReddits: false
    },
    reducers: {
        resetSingleReddit: (state) => {
            state.singleReddit = null;
        },
        resetReddits: (state) => {
            state.reddits = [];
        },
        filterReddits: (state, action) => {
            state.filter = action.payload;
        }
    },
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
                if (action.payload[0] === "single") {
                    state.singleReddit = action.payload[1][0];
                } else if (action.payload[0] === "search"){
                    state.reddits = action.payload[1];
                    state.loadMore = action.payload[1][0].loadNext;
                }else {
                    state.reddits = state.reddits.concat(action.payload[1]);
                    state.loadMore = action.payload[1][0].loadNext;
                }
            })
            .addCase(loadReddits.rejected, (state) => {
                state.isLoadingReddits = false;
                state.failedToLoadReddits = true;
            })
    }
});

export const { resetSingleReddit, resetReddits, filterReddits } = redditsSlice.actions; 
export const selectReddits = (state) => state.reddits.reddits;
export const selectSingleReddit = (state) => state.reddits.singleReddit;
export const selectRedditFilter = (state) => state.reddits.filter;
export const selectIsLoading = (state) => state.reddits.isLoadingReddits;
export const selectLoadMore = (state) => state.reddits.loadMore;

export default redditsSlice.reducer;