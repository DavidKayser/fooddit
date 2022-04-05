import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import redditApi from '../../api/reddit-api';
import { Comment } from './Comment';

function getSubComments(comment) {
    const subComments = comment.data.replies.data.children;
    const filteredComments = subComments?.filter((x) => x.kind === "t1");
    const trimmedComment = filteredComments.map((comment) => {
        //test if JSON data has subComments
        if (comment.data.replies !== undefined && comment.data.replies.data.children !== undefined) {
            const replies = comment.data.replies.data.children;
            console.log(replies);
            //filter addMore out of subcomments
            const filteredSubComments = replies?.filter((x) => x.kind === "t1");
            let data = [];
            data = filteredSubComments.map((subComment) => {
                const name = subComment.data.author;
                const body = subComment.data.body;
                const postedOn = subComment.data.created_utc;
                const downVotes = subComment.data.downs;
                const upVotes = subComment.data.ups;
                const subComments = data;
                return new Comment(name, body, postedOn, downVotes, upVotes, subComments);
            }); 
            return data;
        }
    });
    return trimmedComment;
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
        if (comment.data.replies !== undefined || comment.data.replies.data.children !== undefined) {
            subComments = getSubComments(comment);
        }

        const something = new Comment(name, body, postedOn, downVotes, upVotes, subComments);
        console.log(something);
        return something;
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