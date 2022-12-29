import React, { useRef, useEffect } from 'react'
import IndexRouter from './router/IndexRouter'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { updateTime, start } from './redux/play'

export default function Audio() {
  const dispatch = useDispatch()
  const play = useSelector((state) => state.play)

  const durationChange = (e) => {
    dispatch(updateTime(e.target.currentTime * 1000))
  }

  const playHandle = () => {
    dispatch(start(true))
  }
  const pauseHandle = () => {
    dispatch(start(false))
  }

  useEffect(() => {
    window.audioDom = document.getElementById('audioDom')
  }, [])

  return (
    <div className="h-full">
      <audio
        autoPlay
        id="audioDom"
        className="h-0 w-0"
        src={play.src.url}
        onPlay={playHandle}
        onPause={pauseHandle}
        onTimeUpdate={_.throttle(durationChange, 500)}
      ></audio>
      <IndexRouter />
    </div>
  )
}
