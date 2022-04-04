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
import Reddit from './Reddit';
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
const topic = "popular";
const reddits = {
    id: "id",
    subreddit: "subreddit",
    title: "title",
    mediaType: "Media Type",
    media: "url",
    author: "author",
    upvotes: "100",
    postedOn: "2022",
    numberOfComments: "200"
};

describe("<Reddits />", () => {
    describe("reddit API tests", () => {

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
        
        beforeEach(() => {
            redditApi.mockResolvedValue(mockResponse);
        });
        
        afterEach(() => {
            jest.resetAllMocks();
            cleanup();
        });
        
        it("renders loading screen", () => {
            render(<Provider store={store}><Router><Reddits /></Router></Provider>);
            expect(screen.getByText(/loading/i)).toBeInTheDocument();
        })

        it("fetches popular posts from Reddit API and loads them to screen", async () => {
            render(<Provider store={store}><Router><Reddits /></Router></Provider>);
            const expectedValue = [reddits];
            const loadRedditsResult = await store.dispatch(loadReddits(topic));
            const actualValue = loadRedditsResult.payload;
            expect(actualValue).toEqual(expectedValue);
            expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument();
            expect(screen.getByText(/subreddit/i)).toBeInTheDocument();
            expect(screen.getByText(/author/i)).toBeInTheDocument();
            expect(screen.getByText(/100/i)).toBeInTheDocument();
            expect(screen.getByText(/2022/i)).toBeInTheDocument();
            expect(screen.getByText(/200/i)).toBeInTheDocument();
        });

        it("returns a clean link from id and title", async () => {
            render(<Provider store={store}><Router><Reddits /></Router></Provider>);
            const titleToClean = "!@t#$i%?^t&l*e ()."
            mockResponse.data.children[0].data.title = titleToClean;
            const expectedTitle = `/${reddits.id}/title`;
            await store.dispatch(loadReddits(topic));
            const link = screen.getByRole('link');
            expect(link).toHaveAttribute('href', expectedTitle);
        });

    });

    describe("Reddit content type", () => { 
        const mockResponse = {
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
                            num_comments: "200"
                        }
                    }
                ]
            }
        }

        it("loads a single page", async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={[`/${reddits.id}/${reddits.title}`]}>
                        <Routes>
                            <Route path="/:id/:title" element={<Reddit />} />
                        </Routes>
                    </MemoryRouter>
                </Provider>
            );
            redditApi.mockResolvedValue(mockResponse);
            await store.dispatch(loadReddits(topic));
            expect(screen.getByTestId('overlay')).toBeInTheDocument();
        });

        it("clears single render", async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/", `/${reddits.id}/${reddits.title}`]}>
                        <Routes>
                            <Route path="/" element={<Reddits />} />
                            <Route path="/:id/:title" element={<Reddit />} />
                        </Routes>
                    </MemoryRouter>
                </Provider>
            );
            redditApi.mockResolvedValue(mockResponse);
            await store.dispatch(loadReddits(topic));
            const overlay = screen.getByTestId('overlay');
            fireEvent.click(overlay);
            expect(overlay).not.toBeInTheDocument();
        });
        it("loads image if image element", async () => {
            render(<Provider store={store}><Router><Reddits /></Router></Provider>);
            redditApi.mockResolvedValue(mockResponse);
            await store.dispatch(loadReddits(topic));

            expect(screen.getByAltText(/media/i)).toBeInTheDocument();
        });

        it("loads link if link element", async () => {
            render(<Provider store={store}><Router><Reddits /></Router></Provider>);
            mockResponse.data.children[0].data.post_hint = "link";
            redditApi.mockResolvedValue(mockResponse);
            await store.dispatch(loadReddits(topic));
            const link = screen.getByText('LINK');
            expect(link).toHaveAttribute('href', 'url');
        });

        it("loads link if link element and single page", async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={[`/${reddits.id}/${reddits.title}`]}>
                        <Routes>
                            <Route path="/:id/:title" element={<Reddit />} />
                        </Routes>
                    </MemoryRouter>
                </Provider>
            );
            mockResponse.data.children[0].data.post_hint = "link";
            redditApi.mockResolvedValue(mockResponse);
            await store.dispatch(loadReddits(topic));
            const link = screen.getByText('LINK');
            expect(link).toHaveAttribute('href', 'url');
        });
    });

  });