import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import redditApi from '../../api/reddit-api';

//Run API call and trim function
export const loadComments = createAsyncThunk('comments/loadComments', async (topic) => {
    const response = await redditApi(topic);
    const comments = await response[1].data.children;
    const filteredComments = comments?.filter((x) => x.kind === "t1");

    const trimmedComment = filteredComments.map(comment => {
        let data = [];
        
        //test if JSON data has subComments
        if (comment.data.replies !== undefined && comment.data.replies.children !== undefined ) {
            const subComments = comment.data.replies.data.children;
            //filter addMore out of subcomments
            const filteredSubComments = subComments?.filter((x) => x.kind === "t1");
            
            data = filteredSubComments.map(subComment => {
                return ( 
                    {
                        name: subComment.data.author,
                        comment: subComment.data.body,
                        postedOn: subComment.data.created_utc,
                        downVotes: subComment.data.downs,
                        upVotes: subComment.data.ups
                    }
                )
            }); 
        }

        return (
            {
                name: comment.data.author,
                comment: comment.data.body,
                postedOn: comment.data.created_utc,
                downVotes: comment.data.downs,
                upVotes: comment.data.ups,
                subComments: data
            }
        );
    });
    console.log(trimmedComment);
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