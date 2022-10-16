import React, { useEffect, useState } from 'react';
import { Swiper } from 'antd-mobile';
import axios from 'axios';

export default function Discover() {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    axios.get('/banner').then((res) => {
      setBanner(res.banners);
    });
  }, []);
  const items = banner.map((item) => (
    <Swiper.Item key={item.encodeId}>
      <div onClick={() => {}}>
        <img src={item.imageUrl} />
      </div>
    </Swiper.Item>
  ));

  const [ballList, setBallList] = useState([]);
  useEffect(() => {
    axios.get('/homepage/dragon/ball').then((res) => {
      setBallList(res.data);
    });
  }, []);

  const ball = ballList.map((item) => (
    <div key={item.id} className="flex-none w-1/5 flex flex-col justify-around items-center border">
      <div className="w-12 h-12" style={{ background: `url('${item.iconUrl}')` }}>
        {/* <img src={item.iconUrl} className="w-full h-full rounded-full bg-red-600" /> */}
      </div>
      <div>{item.name}</div>
    </div>
  ));

  return (
    <>
      {banner.length ? <Swiper defaultIndex={1}>{items}</Swiper> : null}
      <div className="overflow-auto flex gap-x-2 py-4">{ball}</div>
    </>
  );
}
