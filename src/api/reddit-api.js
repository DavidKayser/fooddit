const redditApi = async(link) => {
    try {
    const response = await fetch(`https://www.reddit.com/${link}`);
    const json = await response.json();
    return json;
    } catch (error) {
        return error;
    }
};

export default redditApi;