import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, Input } from 'antd-mobile';
import { Search } from '@icon-park/react';
import axios from 'axios';
import _ from 'lodash';
import { setList } from '../../../redux/play';

export default function Discover() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const play = useSelector(state => state.play);

  // 轮播图
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    axios.get('/homepage/block/page').then(res => {
      setBanner(res.data.blocks[0].extInfo.banners);
    });
  }, []);
  const items = banner.map(item => (
    <Swiper.Item key={item.pic}>
      <a href={item.url} className="block">
        <img src={item.pic + '?imageView=1&type=webp&thumbnail=750x0'} />
      </a>
    </Swiper.Item>
  ));

  //图标
  const [ballList, setBallList] = useState([]);
  useEffect(() => {
    axios.get('/homepage/dragon/ball').then(res => {
      setBallList(res.data);
    });
  }, []);
  const ballHandle = item => {
    // console.log(item)
  };
  const ball = ballList.map((item, index) => (
    <div
      key={item.id}
      className="flex-none w-1/5 flex flex-col justify-around items-center"
      onClick={() => ballHandle(item.name)}
    >
      <div
        className="w-12 h-12 ico-img bg-red-500 flex justify-center items-center"
        style={{
          mask: `url('${item.iconUrl}')`,
          WebkitMask: `url('${item.iconUrl}?imageView=1&type=webp&thumbnail=96x0')`,
          maskSize: 'cover',
          WebkitMaskSize: 'cover',
        }}
      >
        <div className="text-white translate-y-0.5 text-sm">{index == 0 ? new Date().getDate() : ''}</div>
      </div>
      <div>{item.name}</div>
    </div>
  ));

  // 新歌推荐
  const [newSong, setNewSong] = useState([]);
  useEffect(() => {
    axios.get('/personalized/newsong?limit=9').then(res => {
      setNewSong(_.chunk(res.result, 3));
    });
  }, []);

  const playMusic = item => {
    dispatch(setList({ list: { id: item.id }, type: 2 }));
  };
  const newSongItem = newSong.map((item, index) => {
    return (
      <Swiper.Item key={index}>
        {item.map(item => {
          return (
            <div className="h-16 flex gap-2 items-center mt-2 pl-4" key={item.id} onClick={() => playMusic(item)}>
              <img
                src={item.picUrl + '?imageView=1&type=webp&thumbnail=128x0'}
                alt={item.name}
                className="h-full rounded-md"
              />
              <div>
                <div className="pb-1">{item.name}</div>
                <div className="text-sm text-gray-700">
                  {item.song.artists.map(a => a.name).toString()} - {item.song.album.name}
                </div>
              </div>
            </div>
          );
        })}
      </Swiper.Item>
    );
  });

  //精品歌单
  const [highQuality, setHighQuality] = useState([]);
  useEffect(() => {
    axios.get('/top/playlist/highquality?limit=20').then(res => {
      setHighQuality(_.chunk(res.playlists, 2));
    });
  }, []);
  const openPlaylist = item => {
    navigate(`/playlist/${item.id}`);
  };

  const highQualityDom = highQuality.map((item, index) => {
    return (
      <div key={index} className="w-24 flex-none">
        {item.map(itemInner => {
          return (
            <div key={itemInner.id} className="w-24 flex-none mb-2" onClick={() => openPlaylist(itemInner)}>
              <img
                src={itemInner.coverImgUrl + '?imageView=1&type=webp&thumbnail=182x0'}
                alt={itemInner.name}
                className="rounded-md"
              />
              <div className="line-clamp-2">{itemInner.name}</div>
            </div>
          );
        })}
      </div>
    );
  });

  //热门歌手
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    axios.get('/top/artists?limit=10').then(res => {
      setArtists(res.artists);
    });
  }, []);

  const artistsDom = artists.map(item => {
    return (
      <div key={item.id} className="w-24 flex-none" onClick={() => navigate(`/artist/${item.id}`)}>
        <img
          src={item.picUrl + '?imageView=1&type=webp&thumbnail=182x0'}
          alt={item.name}
          className="rounded-md object-cover w-24 h-24"
        />
        <div className="line-clamp-1 leading-8">{item.name}</div>
      </div>
    );
  });

  //最新MV
  const [musicVideo, setMusicVideo] = useState([]);
  useEffect(() => {
    axios.get('/mv/first?limit=10').then(res => {
      setMusicVideo(res.data);
    });
  }, []);

  const musicVideoDom = musicVideo.map(item => {
    return (
      <div key={item.id} className="w-24 flex-none">
        <img
          src={item.cover + '?imageView=1&type=webp&thumbnail=182x0'}
          alt={item.name}
          className="rounded-md object-cover w-24 h-24"
        />
        <div className="line-clamp-1 leading-8">{item.name}</div>
      </div>
    );
  });

  //搜索
  const searchHandle = () => {
    navigate('/search');
  };
  return (
    <>
      <div className="px-4 py-2 text-xl">推荐</div>
      <div className="mx-4 mb-2 border rounded-full flex items-center pl-2 gap-1" onClick={searchHandle}>
        <Search theme="outline" size="16" fill="#999" />
        <Input placeholder="请输入内容搜索" value="" />
      </div>
      <div className="mx-4 rounded-md overflow-hidden">
        {banner.length > 0 && <Swiper defaultIndex={1}>{items}</Swiper>}
      </div>
      <div className="overflow-auto flex gap-x-2 py-4 px-4">{ball}</div>
      <div className="px-4 py-2 text-lg">新歌推荐</div>
      <div>
        {newSong.length > 0 && (
          <Swiper defaultIndex={0} stuckAtBoundary={false} slideSize={90} indicator={() => null}>
            {newSongItem}
          </Swiper>
        )}
      </div>
      <div className="px-4 py-2 pt-4 text-lg">专属歌单</div>
      <div className="px-4 flex gap-2 text-sm overflow-auto">{highQualityDom}</div>
      <div className="px-4 py-2 pt-4 text-lg">热门歌手</div>
      <div className="px-4 flex gap-2 text-sm overflow-auto mb-6">{artistsDom}</div>
      {/* <div className="px-4 py-2 pt-4 text-lg">最新MV</div>
      <div className="px-4 flex gap-2 text-sm overflow-auto">{musicVideoDom}</div> */}
    </>
  );
}
