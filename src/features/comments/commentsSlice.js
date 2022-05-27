import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import redditApi from '../../api/reddit-api';

let depth = 0;

function getSubComments(comment) {
    const subComments = comment.data.replies.data.children;
    const filteredComments = subComments?.filter((x) => x.kind === "t1");
    if (filteredComments.length) {
        const trimmedComment = filteredComments.map((comment) => {
            depth++;
            let subComments = [];
            if (comment.data.replies){
                subComments = getSubComments(comment);
            }
            const commentAsObject = {
                name: comment.data.author,
                body: comment.data.body,
                postedOn: comment.data.created_utc,
                downVotes: comment.data.downs,
                upVotes: comment.data.ups,
                subComments: subComments,
                commentDepth: depth
            }
            depth = 0;
            return commentAsObject;

        });
        return trimmedComment;
    }
    return [];
}

//Run API call and trim function
export const loadComments = createAsyncThunk('comments/loadComments', async (topic) => {
    const response = await redditApi(topic);
    const comments = await response[1].data.children;
    const filteredComments = comments?.filter((x) => x.kind === "t1");

    const trimmedComment = filteredComments.map((comment) => {   
        let subComments = [];
        if (comment.data.replies){
            subComments = getSubComments(comment);
        }
        
        const commentAsObject = {
            name: comment.data.author,
            body: comment.data.body,
            postedOn: comment.data.created_utc,
            downVotes: comment.data.downs,
            upVotes: comment.data.ups,
            subComments: subComments
        }
        return commentAsObject;

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
