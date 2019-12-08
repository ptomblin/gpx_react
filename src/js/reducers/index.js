import { combineReducers } from 'redux';

import session from './sessionReducer';
import extents from './extentsReducer';

export default combineReducers({
  session,
  extents
});
