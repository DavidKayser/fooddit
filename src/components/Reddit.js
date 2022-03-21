import React, { useEffect, useState } from 'react';
import { ArticleListItem } from './ArticleListItem.js';
const redditArticles = [
    {
        title: "Test Title",
        image: "https://b.thumbs.redditmedia.com/VUqn5Ks9yX4f4pbLMk6ESjN-1QuJSLr51YWBHXu_BIk.jpg",
        author: "David K",
        authorImage: "https://b.thumbs.redditmedia.com/VUqn5Ks9yX4f4pbLMk6ESjN-1QuJSLr51YWBHXu_BIk.jpg",
        postedOn: "Jan 2nd, 2012"
    },
    {
        title: "Test Title",
        image: "https://b.thumbs.redditmedia.com/VUqn5Ks9yX4f4pbLMk6ESjN-1QuJSLr51YWBHXu_BIk.jpg",
        author: "David K",
        authorImage: "https://b.thumbs.redditmedia.com/VUqn5Ks9yX4f4pbLMk6ESjN-1QuJSLr51YWBHXu_BIk.jpg",
        postedOn: "Jan 2nd, 2012"
    }
];

export default function Reddit() {

    return (
        <div>
        <ArticleListItem article={redditArticles} />
        <p>hello</p>
        </div>
    );
}