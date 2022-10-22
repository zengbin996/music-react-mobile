import React from 'react';
import IndexRouter from './router/IndexRouter';
import { useSelector } from 'react-redux';
import _ from 'lodash';

export default function Audio() {
  const musicSrc = useSelector((state) => state.play.src);

  const durationChange = (e) => {
    console.log(e.target.currentTime);
  };

  return (
    <div className="h-full">
      {musicSrc && <audio src={musicSrc} autoPlay className="h-0" onTimeUpdate={_.throttle(durationChange, 500)}></audio>}
      <IndexRouter />
    </div>
  );
}
