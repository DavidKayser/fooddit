export function apiMapping(response, queryType){
    let loadNext = "";
    let posts;

    if (queryType === "single") {
        posts = response[0].data.children;
    } else {
        posts = response.data.children;
        if (response.data.after !== null) {
            loadNext = response.data.after;
        }
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
            singleLink: reddit.data.permalink
        }
        return postData;
    });
    return [queryType, trimmedReddit];
}