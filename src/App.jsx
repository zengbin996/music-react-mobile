import React from 'react'
import './App.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import Audio from './Audio'
import '@icon-park/react/styles/index.css'

export default function App() {
  if (document.body.clientWidth > 800) {
    alert('当前为移动端项目,建议使用移动设备访问或者打开浏览器手机模拟器')
  }
  
  return (
    <Provider store={store}>
      <Audio />
    </Provider>
  )
}
