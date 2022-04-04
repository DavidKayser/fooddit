import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import redditApi from '../../api/reddit-api';

//Run API call and trim function
export const loadComments = createAsyncThunk('comments/loadComments', async (topic) => {
    const response = await redditApi(topic);
    const posts =  response[1].data.children;
    const trimmedComment = posts.map((comment) => {
        const postData = {
            name: comment.data.author,
            comment: comment.data.body,
            postedOn: comment.data.created_utc,
            downVotes: comment.data.downs,
            upVotes: comment.data.ups
        }
        return postData;
    });
    return trimmedComment;
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        isLoadingComments: false,
        failedToLoadComments: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadComments.pending, (state) => {
                state.isLoadingComments = true;
                state.failedToLoadComments = false;
                state.comments = [];
            })
            .addCase(loadComments.fulfilled, (state, action) => {
                state.isLoadingComments = false;
                state.failedToLoadComments = false;
                state.comments = action.payload;
            })
            .addCase(loadComments.rejected, (state) => {
                state.isLoadingComments = false;
                state.failedToLoadComments = true;
                state.comments = [];
            })
    }
});

export const selectComments = (state) => state.comments.comments;
// export const selectIsLoading = (state) => state.reddits.isLoadingReddits;

export default commentsSlice.reducer;