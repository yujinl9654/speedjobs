import { combineReducers } from 'redux';

import user from './user';
import comment from './comment';

const rootReducer = combineReducers({ user, comment });

export default rootReducer;
