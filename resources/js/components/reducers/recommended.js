import { 
    GET_RECOMMENDED_SUCCESS, 
    GET_RECOMMENDED,
    REFRESH_POSTS,
} from '@/constants/recommended';

const DEFAULT_POSTS = {
    data: [],
    hashtag: ''
};

const initialState = {
    posts: DEFAULT_POSTS,
    mentions: [],
    loading: false
};

const concatPosts = (prevPosts, newPosts) => {
    if (!newPosts) {
        return DEFAULT_POSTS;
    }
    const { data = [], hashtag: prevHashtag } = prevPosts;
    const { data: newData = [], paging: { cursors = {} } = {}, hashtag } = newPosts;
    const cursor = cursors.after;
    if (!data.length || hashtag !== prevHashtag) {
        return {
            data: newData,
            cursor,
            hashtag
        };
    }

    return {
        data: data.concat(newData),
        cursor,
        hashtag
    };
};

const actionHandlers = {
    [GET_RECOMMENDED_SUCCESS] (state, payload) {
        const { posts } = state;
        return {
            ...state,
            posts: concatPosts(posts, payload),
            loading: false
        };
    },
    [GET_RECOMMENDED] (state, hashtag) {
        const { posts: { hashtag: prevHashtag } } = state;
        const newState = {
            ...state,
            loading: true
        };
        if (hashtag !== prevHashtag) {
            newState.posts = DEFAULT_POSTS;
        }
        return newState;
    },
    [REFRESH_POSTS] (state, payload) {
        return {
            ...state,
            posts: payload
        };
    }
};

export default (state = initialState, { type, payload }) => {
    const actionHandler = actionHandlers[type];
    if (actionHandler) {
        return actionHandler(state, payload);
    }
    return state;
};