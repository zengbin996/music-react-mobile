import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar } from 'antd-mobile';
import axios from 'axios';
import _ from 'lodash';

import ListView from '../../components/ListView';
import { setBBar, setCBar } from '../../../redux/tabBar';

export default function Artist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  //隐藏tabBar
  useEffect(() => {
    dispatch(setBBar(false));
    return () => {
      dispatch(setBBar(true));
    };
  }, []);

  //音乐列表
  const [list, setList] = useState([]);
  //歌手详情
  const [detail, setDetail] = useState({});

  //获取数据
  const getData = async () => {
    const result = await Promise.all([axios.get(`/artist/detail?id=${id}`), axios.get(`/artists?id=${id}`)]);
    setDetail(result[0].data);
    setList(result[1].hotSongs);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const back = () => {
    navigate(-1);
  };

  return (
    <div className="text-black h-full flex flex-col">
      <NavBar onBack={back}>{detail.artist && detail.artist.name}</NavBar>
      <div className="overflow-auto flex-1">
        <div className="text-black px-4">
          <ListView list={list} type="artist" />
        </div>
      </div>
    </div>
  );
}
