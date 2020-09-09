import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import auth from './auth';
import content from './content';
import recommended from './recommended';
import ads from './ads';
import profile from './profile';
import socialData from './socialData';
import saved from './saved';

export const store = createStore(
    combineReducers({ 
        auth, 
        content, 
        profile, 
        ads, 
        socialData,
        recommended,
        saved
    }),
    composeWithDevTools(applyMiddleware(thunk))
);