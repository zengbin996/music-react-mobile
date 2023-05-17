import React, { useState, useEffect, useRef } from 'react';
import { Input, List, Tag } from 'antd-mobile';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '@icon-park/react';
import axios from 'axios';
import { setBBar, setCBar } from '../../../redux/tabBar';
import { setList, startAsync } from '../../../redux/play';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { SpinLoading } from 'antd-mobile';
import { VipOne } from '@icon-park/react';

export default function SearchPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nav = useNavigationType();
  const play = useSelector(state => state.play);

  //隐藏tabBar
  useEffect(() => {
    dispatch(setBBar(false));
    // dispatch(setCBar(false))
    return () => {
      dispatch(setBBar(true));
      // dispatch(setCBar(true))
    };
  }, []);

  //输入框
  const [keywords, setKeywords] = useState();
  const changeHandle = e => {
    setKeywords(e);
  };

  //音乐列表
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(false);
  const historyList = (localStorage.getItem('searchHistory') || '鸡你太美,你干嘛').split(',');
  const [searchHistory, setSearchHistory] = useState(historyList);

  //添加历史记录
  const addHistory = value => {
    const list = (localStorage.getItem('searchHistory') || '鸡你太美,你干嘛').split(',');

    if (list.includes(value)) {
      list.splice(list.indexOf(value), 1);
    }
    list.unshift(value);
    list.splice(9, 99);
    localStorage.setItem('searchHistory', list);
    setSearchHistory(list);
  };

  //开始搜索
  const onEnterPress = value => {
    addHistory(value);
    setLoading(true);
    setMusicList([]);
    axios.get(`cloudsearch?keywords=${value}&limit=15`).then(res => {
      setLoading(false);
      setMusicList(res.result.songs);
    });
  };

  //聚焦 失焦
  const [isFocus, setIsFocus] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (nav === 'POP') {
      onEnterPress(searchHistory[0]);
      setKeywords(searchHistory[0]);
    }
    if (nav === 'PUSH') {
      inputRef.current.focus();
    }
  }, []);

  //跳转
  const playHandle = item => {
    dispatch(setList({ list: item, type: 2 }));
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex items-center">
        <div className="border rounded-full flex items-center pl-2 gap-1 flex-1">
          <Search theme="outline" size="16" fill="#999" />
          <Input
            ref={inputRef}
            placeholder="请输入内容"
            clearable
            onEnterPress={function (event) {
              this.onBlur();
              onEnterPress(event.target.value);
            }}
            value={keywords}
            onChange={changeHandle}
            onFocus={() => {
              setIsFocus(true);
              dispatch(setCBar(false));
            }}
            onBlur={() =>
              setTimeout(() => {
                setIsFocus(false);
                dispatch(setCBar(true));
              }, 0)
            }
          />
        </div>

        <span
          className="pl-2"
          onClick={() => {
            navigate('/discover');
          }}
        >
          取消
        </span>
      </div>

      {isFocus && (
        <div className="mt-2">
          <p className="leading-6 text-sm">历史记录</p>
          {searchHistory.map(a => (
            <Tag
              fill="outline"
              key={a}
              className="mr-2 mb-1"
              onClick={event => {
                onEnterPress(event.target.textContent);
                setKeywords(event.target.textContent);
              }}
            >
              {a}
            </Tag>
          ))}
        </div>
      )}

      {loading && <SpinLoading className="m-auto" />}
      {musicList.length > 0 && !isFocus && (
        <List className="mt-2 flex-1 overflow-auto">
          {musicList.map(item => (
            <List.Item key={item.id} onClick={() => playHandle(item)}>
              <div>
                {item.name} {item.fee == 1 && <VipOne theme="outline" size="16" fill="#f00" />}
              </div>
              <div className="text-sm line-clamp-1">
                {item.ar.map(a => a.name).join('，')}
                {item.alia[0] && ` - ${item.alia[0]}`}
              </div>
            </List.Item>
          ))}
        </List>
      )}
    </div>
  );
}
