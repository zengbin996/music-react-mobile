import React, { useRef, useEffect, useCallback } from 'react';
import IndexRouter from './router/IndexRouter';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { updateTime, start, startAsync, nextOne, lastOne } from './redux/play';

export default function Audio() {
  const dispatch = useDispatch();
  const play = useSelector(state => state.play);

  //全局监听 列表发生变化重新开始播放
  useEffect(() => {
    if (play.list.length) {
      dispatch(startAsync(play.list[play.current].id));
    }
  }, [play.list, play.current]);

  //播放
  const playHandle = () => {
    dispatch(start(true));
  };

  //暂停
  const pauseHandle = () => {
    dispatch(start(false));
  };

  useEffect(() => {
    window.audioDom = document.getElementById('audioDom');
  }, []);

  //播放结束
  const endedHandle = index => {
    if (index === 1) {
      dispatch(nextOne());
    } else {
      dispatch(lastOne());
    }
    dispatch(startAsync(play.list[play.current].id));
  };

  //播放时间变化
  const durationChange = useCallback(
    _.throttle(e => {
      dispatch(updateTime(e.target.currentTime * 1000));
    }, 300),
    []
  );

  return (
    <div className="h-full max-w-3xl m-auto">
      <audio
        autoPlay
        id="audioDom"
        className="h-0 w-0"
        src={play.src.url}
        onPlay={playHandle}
        onPause={pauseHandle}
        onEnded={() => endedHandle(1)}
        onTimeUpdate={durationChange}
      ></audio>
      <IndexRouter />
    </div>
  );
}
