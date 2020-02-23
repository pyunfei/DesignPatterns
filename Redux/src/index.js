import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './react-redux'
import store from './store'

import C1 from './components/c1'
import C2 from './components/c2'


ReactDOM.render(<Provider store={store}>
  <C1 />
  <br/>
  <C2 />
</Provider>, document.getElementById('root'));