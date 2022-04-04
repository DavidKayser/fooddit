const redditApi = async(topic) => {
    try {
    const response = await fetch(`https://www.reddit.com/${topic}`);
    const json = await response.json();
    return json;
    } catch (error) {
        return error;
    }
};

export default redditApi;