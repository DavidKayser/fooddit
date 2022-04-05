import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import redditApi from '../../api/reddit-api';
import { Comment } from './Comment';

function getSubComments(comment) {
    const subComments = comment.data.replies.data.children;
    const filteredComments = subComments?.filter((x) => x.kind === "t1");
    if (filteredComments.length) {
        const trimmedComment = filteredComments.map((comment) => {
            const name = comment.data.author;
            const body = comment.data.body;
            const postedOn = comment.data.created_utc;
            const downVotes = comment.data.downs;
            const upVotes = comment.data.ups;
            let subComments = [];
            if (comment.data.replies){
                subComments = getSubComments(comment);
            }
            const commentAsClass = new Comment(name, body, postedOn, downVotes, upVotes, subComments);
            const commentAsObject = {
                name: commentAsClass.name,
                body: commentAsClass.body,
                postedOn: commentAsClass.postedOn,
                downVotes: commentAsClass.downVotes,
                upVotes: commentAsClass.upVotes,
                subComments: commentAsClass.subComments
            }

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
        const name = comment.data.author;
        const body = comment.data.body;
        const postedOn = comment.data.created_utc;
        const downVotes = comment.data.downs;
        const upVotes = comment.data.ups;
        let subComments = [];
        if (comment.data.replies){
            subComments = getSubComments(comment);
        }
        
        const commentAsClass = new Comment(name, body, postedOn, downVotes, upVotes, subComments);

        const commentAsObject = {
            name: commentAsClass.name,
            body: commentAsClass.body,
            postedOn: commentAsClass.postedOn,
            downVotes: commentAsClass.downVotes,
            upVotes: commentAsClass.upVotes,
            subComments: commentAsClass.subComments
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