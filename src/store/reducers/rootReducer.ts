import { combineReducers } from 'redux';

import { reducer as shopReducer } from './shopsReducer';
import { reducer as profileReducer } from './profileReducer';
import { reducer as cardsReducer } from './cardReducer';

export const rootReducer = combineReducers({
    shopReducer,
    profileReducer,
    cardsReducer
  });
  
  export type RootState = ReturnType<typeof rootReducer>;