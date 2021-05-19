import { combineReducers } from 'redux';

import { reducer as shopReducer } from './shopsReducer';
import { reducer as profileReducer } from './profileReducer';
import { reducer as cardsReducer } from './cardsReducer';
import { reducer as addCardReducer } from './addCardReducer';

export const rootReducer = combineReducers({
    shopReducer,
    profileReducer,
    cardsReducer,
    addCardReducer
  });
  
  export type RootState = ReturnType<typeof rootReducer>;