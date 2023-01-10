import React, { useRef, useEffect } from 'react'
import IndexRouter from './router/IndexRouter'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { updateTime, start, startAsync, nextOne, lastOne } from './redux/play'

export default function Audio() {
  const dispatch = useDispatch()
  const play = useSelector((state) => state.play)

  //全局监听 列表发生变化重新开始播放
  useEffect(() => {
    if (play.list.length) {
      dispatch(startAsync(play.list[play.current].id))
    }
  }, [play.list, play.current])

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

  //播放结束
  const endedHandle = (index) => {
    if (index === 1) {
      dispatch(nextOne())
    } else {
      dispatch(lastOne())
    }
    dispatch(startAsync(play.list[play.current].id))
  }

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
        onEnded={endedHandle}
      ></audio>
      <IndexRouter />
    </div>
  )
}
