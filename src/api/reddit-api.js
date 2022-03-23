// export const loadUserAvatar = createAsyncThunk('reddits/loadUserAvatar', async (user) => {
//     const response = await fetch(`https://www.reddit.com/r/${user}/about.json`);
//     const json = await response.json();
//     const avatar =  json.data.community_icon;
//     return avatar;
// });