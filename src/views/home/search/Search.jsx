import React, { useState, useEffect } from 'react'
import { Input, List, NavBar } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from '@icon-park/react'
import axios from 'axios'
import { setBBar } from '../../../redux/tabBar'
import { useNavigate } from 'react-router-dom'
import { addOneMusic } from '../../../redux/playMusic'

export default function SearchPage() {
  const navigate = new useNavigate()
  const dispatch = new useDispatch()
  const playState = useSelector((state) => state.play)

  console.log(playState)

  //隐藏tabBar
  useEffect(() => {
    dispatch(setBBar(false))
    return () => {
      dispatch(setBBar(true))
    }
  }, [])

  const [keywords, setKeywords] = useState()
  const changeHandle = (e) => {
    setKeywords(e)
  }

  const [musicList, setMusicList] = useState([])

  const onEnterPress = () => {
    axios.get(`cloudsearch?keywords=${keywords}&limit=15`).then((res) => {
      setMusicList(res.result.songs)
    })
  }

  const playHandle = (item) => {
    dispatch(addOneMusic(item))
    // navigate('/play/' + id)
  }

  return (
    <div className="p-4 flex flex-col h-screen">
      <div className="flex items-center">
        <div className="border rounded-full flex items-center pl-2 gap-1 flex-1">
          <Search theme="outline" size="16" fill="#999" />
          <Input
            placeholder="请输入内容"
            clearable
            onEnterPress={onEnterPress}
            value={keywords}
            onChange={changeHandle}
          />
        </div>
        <span className="pl-2">取消</span>
      </div>

      <List className="mt-2 flex-1 overflow-auto">
        {musicList.map((item) => (
          <List.Item key={item.id} onClick={() => playHandle(item)}>
            <div>{item.name}</div>
            <div className="text-sm line-clamp-1">
              {item.ar.map((a) => a.name).join('，')}
              {item.alia[0] && ` - ${item.alia[0]}`}
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  )
}
