import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar, List } from 'antd-mobile';
import { Headset, Comment, Play, VipOne } from '@icon-park/react';
import { setBBar } from '../../../redux/tabBar';
import { setCBar } from '../../../redux/tabBar';
import { setList, startAsync } from '../../../redux/play';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

export default function PlayList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const play = useSelector(state => state.play);
  //隐藏tabBar
  useEffect(() => {
    dispatch(setBBar(false));
    return () => {
      dispatch(setBBar(true));
    };
  }, []);
  //获取歌单内容
  const [detail, setDetail] = useState({});

  const getPlaylist = async () => {
    const result = await axios.get(`/playlist/detail?id=${id}`);
    setDetail(result.playlist);
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  const back = () => {
    navigate(-1);
  };

  const [barOpacity, setBarOpacity] = useState(0);

  const scrollHandle = _.throttle(function () {
    let opacity = 0;
    if (this.scrollTop > 192 || this.scrollTop == 192) {
      opacity = 1;
    } else {
      opacity = this.scrollTop / 192;
    }
    setBarOpacity(opacity);
  }, 20);

  useEffect(() => {
    const main = document.getElementById('main');
    main.scrollTop = 0;

    main.addEventListener('scroll', scrollHandle);
    return () => {
      main.removeEventListener('scroll', scrollHandle);
    };
  }, []);

  const playAll = () => {
    dispatch(setList({ list: detail.tracks, type: 1 }));
  };

  const playMusic = item => {
    const index = detail.tracks.findIndex(a => a.id == item.id);
    dispatch(setList({ list: detail.tracks, type: 1, index: index }));
  };

  return (
    <div className="text-white">
      <div className="absolute z-10 w-full">
        <div
          style={{
            backgroundImage: `url(${detail.coverImgUrl}?imageView=1&type=webp&thumbnail=750x750)`,
            opacity: barOpacity,
          }}
          className="w-full absolute h-45"
        >
          <div className="w-full h-full backdrop-blur"></div>
        </div>

        <NavBar className="absolute w-full" onBack={back}>
          歌单
        </NavBar>
      </div>

      <div className="overflow-auto height-full">
        <div
          style={{
            backgroundImage: `url(${detail.coverImgUrl}?imageView=1&type=webp&thumbnail=750x750)`,
            backgroundSize: '100% 100%',
          }}
        >
          <div className="backdrop-blur-xl bg-black/20" style={{ paddingTop: '45px' }}>
            <div className="h-48 flex px-4">
              <img src={detail.coverImgUrl + '?imageView=1&type=webp&thumbnail=100x100'} className="h-24" />

              <div className="ml-2 flex flex-col">
                <div className="text-lg font-bold"> {detail.name}</div>
                <div className="flex-1 overflow-auto mt-1"> {detail.description}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-black p-4">
          <div
            className="text-base flex justify-between items-center bg-white"
            style={
              barOpacity === 1
                ? { position: 'absolute', top: 45, left: 0, zIndex: 100, padding: '16px 8px', width: '100%' }
                : {}
            }
          >
            <div className="text-lg flex items-center" onClick={playAll}>
              <span>全部播放</span>
              <Play theme="outline" size="24" fill="#333" className="ml-1" />
            </div>

            <div>
              <Headset className="mr-1" />
              {detail.playCount}
            </div>

            <div onClick={() => navigate(`/play/comment/${id}?type=playList`)}>
              <Comment className="mr-1" theme="outline" size="16" fill="#333" />
              {detail.commentCount}
            </div>
          </div>

          {detail.tracks && detail.tracks.length > 0 && (
            <List className="mt-2 flex-1 overflow-auto">
              {detail.tracks.map(item => (
                <List.Item key={item.id} onClick={() => playMusic(item)}>
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
      </div>
    </div>
  );
}
