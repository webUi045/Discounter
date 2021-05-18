import { combineReducers } from 'redux';

import { reducer as shopReducer } from './shopsReducer';
import { reducer as profileReducer } from './profileReducer';
import { reducer as cardsReducer } from './cardsReducer';

export const rootReducer = combineReducers({
    shopReducer,
    profileReducer,
    cardsReducer,
  });
  
  export type RootState = ReturnType<typeof rootReducer>;