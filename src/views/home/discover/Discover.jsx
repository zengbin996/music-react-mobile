import React, { useEffect, useState } from 'react';
import { Swiper } from 'antd-mobile';
import axios from 'axios';
import _ from 'lodash';
import './discover.css';

export default function Discover() {
  // 轮播图
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    axios.get('/homepage/block/page').then((res) => {
      setBanner(res.data.blocks[0].extInfo.banners);
    });
  }, []);
  const items = banner.map((item) => (
    <Swiper.Item key={item.pic}>
      <div onClick={() => {}}>
        <img src={item.pic} />
      </div>
    </Swiper.Item>
  ));

  //图标
  const [ballList, setBallList] = useState([]);
  useEffect(() => {
    axios.get('/homepage/dragon/ball').then((res) => {
      setBallList(res.data);
    });
  }, []);
  const ball = ballList.map((item, index) => (
    <div key={item.id} className="flex-none w-1/5 flex flex-col justify-around items-center">
      <div className="w-12 h-12 ico-img bg-red-500 flex justify-center items-center" style={{ mask: `url('${item.iconUrl}')`, maskSize: 'cover' }}>
        <div className="text-white translate-y-0.5 text-sm">{index == 0 ? new Date().getDate() : ''}</div>
      </div>
      <div>{item.name}</div>
    </div>
  ));

  const [newSong, setNewSong] = useState([]);
  useEffect(() => {
    axios.get('/personalized/newsong?limit=9').then((res) => {
      setNewSong(_.chunk(res.result, 3));
    });
  }, []);

  const newSongItem = newSong.map((item, index) => {
    return (
      <Swiper.Item key={index}>
        {item.map((item) => {
          return (
            <div className="h-16 flex gap-2 items-center mt-2 pl-4" key={item.id}>
              <img src={item.picUrl} alt={item.name} className="h-full rounded-md" />
              <div>
                <div className="pb-1">{item.name}</div>
                <div className="text-sm text-gray-700">
                  {item.song.artists.map((a) => a.name).toString()} - {item.song.album.name}
                </div>
              </div>
            </div>
          );
        })}
      </Swiper.Item>
    );
  });

  //是否显示组件
  const isShow = (Comp, isTrue) => {
    if (isTrue) return Comp;
    return null;
  };

  return (
    <>
      <div className="px-4 py-2 text-xl">推荐</div>
      <div className="mx-4 rounded-md border overflow-hidden">{isShow(<Swiper defaultIndex={1}>{items}</Swiper>, banner.length)}</div>
      <div className="overflow-auto flex gap-x-2 py-4 px-4">{ball}</div>

      <div className="px-4 py-2 text-lg">新歌推荐</div>
      <div>
        <Swiper defaultIndex={0} stuckAtBoundary={false} slideSize={90} indicator={() => null}>
          {newSongItem}
        </Swiper>
      </div>

      <div className="px-4 py-2 text-lg">专属歌单</div>
    </>
  );
}
