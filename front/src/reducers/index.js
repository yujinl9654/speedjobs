import { combineReducers } from 'redux';
import user from './user';
import comment from './comment';
import post from './post';
import company from './company';

const rootReducer = combineReducers({ user, post, comment, company });

export default rootReducer;
