import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { CompassOutline, UserOutline, HistogramOutline, SearchOutline } from 'antd-mobile-icons';
import Discover from './discover/Discover';
import User from './user/User';
import Ranking from './ranking/Ranking';
import Search from './search/Search';

export default function Home() {
  const navigate = new useNavigate();
  const location = new useLocation();

  const tabs = [
    {
      key: '/discover',
      title: '发现',
      icon: <CompassOutline />,
    },
    {
      key: '/ranking',
      title: '排行',
      icon: <HistogramOutline />,
    },
    {
      key: '/search',
      title: '搜索',
      icon: <SearchOutline />,
    },
    {
      key: '/user',
      title: '我的',
      icon: <UserOutline />,
    },
  ];

  const [activeKey, setActiveKey] = useState(location.pathname);

  const changeTabBar = (value) => {
    navigate(value);
    setActiveKey(value);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto" >
        <Routes>
          <Route path="/discover" element={<Discover />} />
          <Route path="/user" element={<User />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Navigate to="/discover" />} />
        </Routes>
      </div>

      <div>
        {/* <div className="h-12 border"></div> */}
        <TabBar className="h-12" onChange={(item) => changeTabBar(item)} activeKey={activeKey}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
}
