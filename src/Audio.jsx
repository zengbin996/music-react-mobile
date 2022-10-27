import React, { useRef, useEffect } from 'react';
import IndexRouter from './router/IndexRouter';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { switchState } from './views/play/playSlice';

export default function Audio() {
  const dispatch = useDispatch();
  const musicSrc = useSelector((state) => state.play.src);
  const state = useSelector((state) => state.play.state);

  const durationChange = (e) => {
    // console.log(e.target.currentTime);
  };

  const playHandle = () => {
    dispatch(switchState(true));
  };
  const pauseHandle = () => {
    dispatch(switchState(false));
  };

  useEffect(() => {
    window.audioDom = document.getElementById('audioDom');
  }, []);

  return (
    <div className="h-full">
      <audio autoPlay id="audioDom" className="h-0 w-0" src={musicSrc} onPlay={playHandle} onPause={pauseHandle} onTimeUpdate={_.throttle(durationChange, 500)}></audio>
      <IndexRouter />
    </div>
  );
}
