import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { start } from './playSlice';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Counter() {
  const { id } = new useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/song/url', { params: { id } }).then((res) => {
      dispatch(start(res.data[0].url));
    });
  }, [id]);

  return <div>999</div>;
}
