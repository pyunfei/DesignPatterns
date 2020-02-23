import { combineReducers } from '../../redux';

import C1 from './c1';
import C2 from './c2';

const reducer = combineReducers({
  C1,
  C2
})

export default reducer;