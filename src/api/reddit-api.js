const redditApi = async(topic) => {
    const response = await fetch(`https://www.reddit.com/r/${topic}.json`);
    const json = await response.json();
    return json;
};

export default redditApi;