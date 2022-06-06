const redditApi = async(link) => {
    try {
        const response = await fetch(`https://www.reddit.com${link}`);
        if (response.ok) {
            const json = await response.json();
            return json;
        }
        throw new Error('Request failed!');
    } catch (error) {
        console.error(error);
    }
};

export default redditApi;
