import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import App from '../../app/App';
import redditsReducer, { loadReddits } from "./redditsSlice";
import redditApi from '../../api/reddit-api';

jest.mock('../../api/reddit-api');

describe("<Reddits />", () => {
    describe("Reddit API tests", () => {
        it("Fetches popular posts from Reddit API", async () => {
            const topic = "popular";
            const expectedValue = [
                {
                    id: "id",
                    subreddit: "subreddit",
                    title: "title",
                    mediaType: "Media Type",
                    media: "url",
                    author: "author",
                    upvotes: "100",
                    postedOn: "2022",
                    numberOfComments: "200"
                }
            ];
    
            const mockResponse = {
                data: {
                    children: [
                        {
                            data: {
                                id: "id",
                                subreddit_name_prefixed: "subreddit",
                                title: "title",
                                post_hint: "Media Type",
                                url_overridden_by_dest: "url",
                                author: "author",
                                ups: "100",
                                created_utc: "2022",
                                num_comments: "200"
                            }
                        }
                    ]
                }
            }
            redditApi.mockResolvedValue(mockResponse);
    
            const loadRedditsResult = await store.dispatch(loadReddits(topic));
            const actualValue = loadRedditsResult.payload;
            
            expect(actualValue).toEqual(expectedValue);
    
        });
    });

  });