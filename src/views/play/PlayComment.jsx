import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBBar, setCBar } from '../../redux/tabBar';
import { NavBar, List } from 'antd-mobile';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function PlayComment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  //隐藏tabBar
  useEffect(() => {
    dispatch(setBBar(false));
    dispatch(setCBar(false));
    return () => {
      dispatch(setBBar(true));
      dispatch(setCBar(true));
    };
  }, []);
  //返回
  const back = () => navigate(-1);

  //评论内容
  const [commentList, setCommentList] = useState([]);
  const [commentListHot, setCommentListHot] = useState([]);

  const getCommentList = async () => {
    let result = null;

    if (searchParams.get('type') === 'playList') {
      result = await axios.get(`/comment/playlist?id=${id}&limit=50`);
    } else {
      result = await axios.get(`/comment/music?id=${id}&limit=50`);
    }
    setCommentList(result.comments);
    setCommentListHot(result.hotComments);
  };

  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <NavBar onBack={back}>评论</NavBar>

      <div className="flex-1 overflow-auto">
        <List>
          {commentListHot.map((item, index) => (
            <List.Item className="text-base font-bold" key={index}>
              {item.content}
            </List.Item>
          ))}

          {commentList.map((item, index) => (
            <List.Item className="text-base" key={index}>
              {item.content}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
}
