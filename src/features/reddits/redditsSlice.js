import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import redditApi from '../../api/reddit-api';

//Run API call and trim function
export const loadReddits = createAsyncThunk('reddits/loadReddits', async (loadData) => {
    const {link, queryType } = loadData;
    const response = await redditApi(link);

    switch(queryType) {
        case "full":
            if (response.data.children.length <= 0) {
                return [queryType, "no reddits"];
            }
            break;
        case "single":
            if (response[0].data.children.length <= 0) {
                return [queryType, "no reddits"];
            }
            break;
        case "search":
            if (response.data.children.length <= 0) {
                return [queryType, "no reddits"];
            }
            break;
        default:
            console.log("could not get queryType");
    }
    let loadNext = ""
    let posts;

    if (queryType === "single") {
        posts = response[0].data.children;
    } else {
        if (response.data.after !== null) {
            loadNext = response.data.after;
        } else loadNext = "none";
        posts = response.data.children;
    } 
    //filter posts without images
    const filteredPosts = posts.filter(post => post.data.post_hint === "image");
    const trimmedReddits = filteredPosts.map((reddit) => {
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
    return [queryType, trimmedReddits];
});

const redditsSlice = createSlice({
    name: 'reddits',
    initialState: {
        reddits: [],
        loadMore: "",
        singleReddit: null,
        noRedditsFound: false,
        isLoadingReddits: false,
        failedToLoadReddits: false,
        isLoadingFilter: false
    },
    reducers: {
        resetSingleReddit: (state) => {
            state.singleReddit = null;
        },
        resetReddits: (state) => {
            state.reddits = [];
            state.loadMore = "";
            state.filter = null;
        },
        changeLoadingStatus: (state, action) => {
            state.isLoadingFilter = action.payload;
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
                if (action.payload[1] === "no reddits") {
                    state.noRedditsFound = true;
                    return;
                } else {
                    state.noRedditsFound = false;
                }
                if (action.payload[0] === "single") {
                    state.singleReddit = action.payload[1][0];
                } else {
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

export const { resetSingleReddit, resetReddits, removeLoading, changeLoadingStatus } = redditsSlice.actions; 
export const selectReddits = (state) => state.reddits.reddits;
export const selectSingleReddit = (state) => state.reddits.singleReddit;
export const selectIsLoading = (state) => state.reddits.isLoadingReddits;
export const selectIsLoadingFilter = (state) => state.reddits.isLoadingFilter;
export const selectNoRedditsFound = (state) => state.reddits.noRedditsFound;
export const selectLoadMore = (state) => state.reddits.loadMore;
export default redditsSlice.reducer;