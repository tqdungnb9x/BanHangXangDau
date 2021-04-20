import {combineReducers} from 'redux';
import configStore from './createStore';
import {AuthTypes, reducer as AuthReducer} from './authRedux';
import {UserTypes, reducer as UserReducer} from './userRedux';
import {NewsTypes, reducer as NewsReducer} from './newsRedux';

// import {FetchTypes, reducer as FetchReducer} from './fetchRedux';

import rootSaga from '../sagas';

const configStored = () => {
  const reducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    news: NewsReducer,
    // fetch: FetchReducer,
  });

  const rootReducer = (state, action) => {
    return reducers(state, action);
  };

  return configStore(rootReducer, rootSaga);
};

export default configStored;