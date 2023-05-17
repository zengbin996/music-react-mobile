import React from 'react';
import './App.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import Audio from './Audio';
import '@icon-park/react/styles/index.css';

export default function App() {
  return (
    <Provider store={store}>
      <div className="text-center hidden md:block">
        <a href="//116.204.127.62:9002">当前为移动端项目，点击跳转PC项目</a>
      </div>
      <Audio />
    </Provider>
  );
}
