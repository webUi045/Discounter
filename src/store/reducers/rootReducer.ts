import { combineReducers } from 'redux';

import { reducer as shopReducer } from './shopsReducer';
import { reducer as profileReducer } from './profileReducer';

export const rootReducer = combineReducers({
    shopReducer,
    profileReducer,
  });
  
  export type RootState = ReturnType<typeof rootReducer>;