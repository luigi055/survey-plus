// @flow
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';

import App from './components/App';
import configure from './redux/store/configureStore';

const store = configure ();

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById ('app')
);
