import React from 'react';
import { Provider } from 'react-redux';
import { createStore  } from 'redux';
import rootReducer from './reducers/index';

const create = () => createStore(rootReducer);

export default ({ element }) => (
  <Provider store={create()}>{element}</Provider>
);

