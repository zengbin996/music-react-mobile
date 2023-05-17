import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { CompassOutline, UserOutline, HistogramOutline, SearchOutline } from 'antd-mobile-icons';
import { useSelector } from 'react-redux';
import { Play as PLayIco, PauseOne } from '@icon-park/react';

import Discover from './discover/Discover';
import User from './user/User';
import Ranking from './ranking/Ranking';
import Search from './search/Search';
import Play from '../../views/play/Play';
import PlayComment from '../play/PlayComment';
import PlayList from './playList/PlayList';
import Artist from './artist/Artist';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { buttonBar, controlBar } = useSelector(state => state.tabBar);
  const play = useSelector(state => state.play);

  const tabs = [
    {
      key: '/discover',
      title: '发现',
      icon: <CompassOutline />,
    },
    // {
    //   key: '/ranking',
    //   title: '排行',
    //   icon: <HistogramOutline />,
    // },
    {
      key: '/user',
      title: '我的',
      icon: <UserOutline />,
    },
  ];

  const [activeKey, setActiveKey] = useState(location.pathname);

  const changeTabBar = value => {
    navigate(value);
    setActiveKey(value);
  };

  const toPlay = () => {
    navigate(`/play/${play.src.id}`);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto" id="main">
        <Routes>
          <Route path="/discover" element={<Discover />} />
          <Route path="/user" element={<User />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/search" element={<Search />} />
          <Route path="/playlist/:id" element={<PlayList />} />
          <Route path="/play/:id" element={<Play />} />
          <Route path="/play/comment/:id" element={<PlayComment />} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/" element={<Navigate to="/discover" />} />
        </Routes>
      </div>

      <div>
        {controlBar && play.detail.name && (
          <div className="h-12 mx-4 mb-2 relative" onClick={toPlay}>
            <img
              src={`${play.detail.al.picUrl}?imageView=1&type=webp&thumbnail=56x56`}
              className="rounded-md w-14 absolute bottom-0 z-50"
            />

            <div className="flex-1 flex flex-col-reverse rounded-3xl overflow-hidden">
              <div
                className="h-12"
                style={{
                  backgroundImage: `url(${play.detail.al.picUrl}?imageView=1&type=webp&thumbnail=750x48)`,
                  backgroundSize: '100% 100%',
                }}
              >
                <div className="bg-black/10 backdrop-blur h-full text-white pl-16 pr-4 flex justify-between items-center text-sm">
                  <span>
                    {play.detail.name} - {play.detail.ar.map(item => item.name).join('，')}
                  </span>

                  {play.paused ? (
                    <PLayIco
                      theme="outline"
                      size="36"
                      fill="#F2F2F2"
                      className="cursor-pointer"
                      onClick={e => {
                        e.stopPropagation();
                        window.audioDom.play();
                      }}
                    />
                  ) : (
                    <PauseOne
                      theme="outline"
                      size="36"
                      fill="#F2F2F2"
                      className="cursor-pointer"
                      onClick={e => {
                        e.stopPropagation();
                        window.audioDom.pause();
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 播放条 */}
        {buttonBar && (
          <TabBar className="h-12" onChange={item => changeTabBar(item)} activeKey={activeKey}>
            {tabs.map(item => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
        )}
      </div>
    </div>
  );
}
