const redditApi = async(topic) => {
    try {
    const response = await fetch(`https://www.reddit.com/r/${topic}`);
    const json = await response.json();
    return json;
    } catch (error) {
        return error;
    }
};

export default redditApi;