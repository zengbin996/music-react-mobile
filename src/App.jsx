import React from 'react';
import './App.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import Audio from './Audio';
import '@icon-park/react/styles/index.css';

export default function App() {
  return (
    <Provider store={store}>
      <Audio />
    </Provider>
  );
}
