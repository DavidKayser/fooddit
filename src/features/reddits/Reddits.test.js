import React from 'react';
import { 
    BrowserRouter as Router,
    Routes,
    Route,
    MemoryRouter} from 'react-router-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import Reddits from './Reddits';
import RedditSingle from './RedditSingle';
import { loadReddits } from "./redditsSlice";
import redditApi from '../../api/reddit-api';
import '@testing-library/jest-dom/extend-expect';


jest.mock('../../api/reddit-api');
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const reddits = [
    "full",
    [
        {
            loadNext: "50fgf",
            id: "id",
            subreddit: "subreddit",
            title: "title",
            mediaType: "image",
            media: "imagelink.com",
            mediaDimensions: {width: 100, height: 100},
            author: "author",
            upvotes: "100",
            postedOn: "2022",
            numberOfComments: "200",
            singleLink: "www.this.com",
            flair: "food"
        }
    ]
];
describe("<Reddits />", () => {
    describe("reddit API tests", () => {

        const mockResponse = {
            data: {
                after: "50fgf",
                children: [
                    {
                        data: {
                            id: "id",
                            subreddit_name_prefixed: "subreddit",
                            title: "title",
                            post_hint: "image",
                            url_overridden_by_dest: "url",
                            author: "author",
                            ups: "100",
                            created_utc: "2022",
                            num_comments: "200",
                            permalink: "www.this.com",
                            link_flair_text: "food",
                            preview: {
                                images: [
                                    {
                                        resolutions: [
                                            {},
                                            {},
                                            {},
                                            {},
                                            {
                                                url: "imagelink.com",
                                                width: 100,
                                                height: 100
                                            },
                                            {}
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
        
        beforeEach(() => {
            redditApi.mockResolvedValue(mockResponse);
        });
        
        afterEach(() => {
            jest.resetAllMocks();
            cleanup();
        });
        
        // it("renders loading screen", () => {
        //     render(<Provider store={store}><Router><Reddits /></Router></Provider>);
        //     expect(screen.getByText(/loading/i)).toBeInTheDocument();
        // })

        it("fetches popular posts from Reddit API and loads them to screen", async () => {
            render(<Provider store={store}><Router><Reddits /></Router></Provider>);
            const expectedValue = reddits;
            const loadRedditsResult = await store.dispatch(loadReddits({link: `/r/food.json`, queryType: "full"}));
            const actualValue = loadRedditsResult.payload;
            expect(actualValue).toEqual(expectedValue);
            expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument();
            expect(screen.getByText(/subreddit/i)).toBeInTheDocument();
            expect(screen.getByText(/author/i)).toBeInTheDocument();
            expect(screen.getByText(/100/i)).toBeInTheDocument();
            expect(screen.getByText(/200/i)).toBeInTheDocument();
        });

    });

  });

  describe("Reddit content type", () => { 
    const mockResponse = [
        {
            data: {
                children: [
                    {
                        data: {
                            id: "id",
                            subreddit_name_prefixed: "subreddit",
                            title: "title",
                            post_hint: "image",
                            url_overridden_by_dest: "url",
                            author: "author",
                            ups: "100",
                            created_utc: "2022",
                            num_comments: "200",
                            permalink: "www.this.com",
                            link_flair_text: "food",
                            preview: {
                                images: [
                                    {
                                        resolutions: [
                                            {},
                                            {},
                                            {},
                                            {},
                                            {
                                                url: "imagelink.com",
                                                width: 100,
                                                height: 100
                                            },
                                            {}
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    ]

    it("loads a single page", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/${reddits.id}/${reddits.title}`]}>
                    <Routes>
                        <Route path="/:id/:title" element={<RedditSingle />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        redditApi.mockResolvedValue(mockResponse);
        await store.dispatch(loadReddits({link: `/r/food.json`, queryType: "single"}));
        expect(screen.getByTestId('overlay')).toBeInTheDocument();
    });

    it("clears single render", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/", `/${reddits.id}/${reddits.title}`]}>
                    <Routes>
                        <Route path="/" element={<Reddits />} />
                        <Route path="/:id/:title" element={<RedditSingle />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        redditApi.mockResolvedValue(mockResponse);
        await store.dispatch(loadReddits({link: `/r/food.json`, queryType: "single"}));
        const overlay = screen.getByTestId('overlay');
        fireEvent.click(overlay);
        expect(overlay).not.toBeInTheDocument();
    });
});