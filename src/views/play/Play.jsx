import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSrc, setDetail, setMusicState, setPattern } from './playSlice';
import axios from 'axios';
import { NavBar, ProgressBar } from 'antd-mobile';
import { DownOutline, HeartFill, HeartOutline } from 'antd-mobile-icons';
import { PlayCycle, PlayOnce, ShuffleOne, GoStart, Play, PauseOne, GoEnd, MusicList } from '@icon-park/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export default function Counter() {
  const navigate = useNavigate();
  const { id } = new useParams();
  const dispatch = useDispatch();

  const { musicDetail, musicState, musicPlayPattern, musicCurrentTime } = useSelector((state) => state.play);

  useEffect(() => {
    axios.get('/song/url', { params: { id } }).then((res) => {
      dispatch(setSrc(res.data[0].url));
    });

    axios.get('/song/detail', { params: { ids: id } }).then((res) => {
      dispatch(setDetail(res.songs[0]));
    });
  }, [id]);

  const back = () => {
    navigate(-1);
  };

  //三个选项卡
  const [currentNav, setCurrentNav] = useState(1);
  const getNavBarClass = (index) => {
    if (index === currentNav) {
      return 'px-2 cursor-pointer text-white/90';
    }
    return 'px-2 cursor-pointer';
  };
  const clickNav = (index) => {
    setCurrentNav(index);
  };

  if (!musicDetail.name) return null;

  return (
    <div className="h-full bg-no-repeat bg-cover" style={{ backgroundImage: `url(${musicDetail.al.picUrl}?imageView=1&type=webp&thumbnail=750x750)` }}>
      <div className="bg-black/50 backdrop-blur-xl h-full flex flex-col">
        <NavBar backArrow={<DownOutline color="rgba(255,255,255,0.9)" />} onBack={back}>
          <div className="flex justify-center items-center text-xs text-white/30">
            <p className={getNavBarClass(0)} onClick={() => clickNav(0)}>
              推荐
            </p>
            <p className="border-r h-2 border-white/30"></p>

            <p className={getNavBarClass(1)} onClick={() => clickNav(1)}>
              歌曲
            </p>
            <p className="border-r h-2 border-white/30"></p>

            <p className={getNavBarClass(2)} onClick={() => clickNav(2)}>
              歌词
            </p>
          </div>
        </NavBar>

        <div className="flex-1 px-6 text-white/90 flex flex-col justify-between">
          <img src={`${musicDetail.al.picUrl}?imageView=1&type=webp&thumbnail=750x750`} alt={musicDetail.name} className="m-auto rounded-xl w-full" />

          <div className="flex-1 flex flex-col justify-between pb-16">
            <div className="py-8">
              <div className="flex justify-between">
                <div className="text-xl">{musicDetail.name}</div>
                <div>
                  <HeartFill fontSize={26} className="cursor-pointer" />
                  {/* <HeartOutline fontSize={26} /> */}
                </div>
              </div>
              <div className="text-sm py-2">{musicDetail.ar.map((item) => item.name).join('，')}</div>
              <div>歌词</div>
            </div>

            <div>
              <div className="pb-6">
                <ProgressBar
                  percent={42}
                  style={{
                    '--track-width': '2px',
                    '--fill-color': '#F1F5F9',
                    '--track-color': '#FFFFFF22',
                  }}
                />
                <div className="flex justify-between mt-2">
                  <span>{dayjs.duration(musicCurrentTime).format('mm:ss')}</span>
                  <span>{dayjs.duration(musicDetail.dt).format('mm:ss')}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                {musicPlayPattern === 0 && <PlayCycle onClick={() => dispatch(setPattern())} theme="outline" size="26" fill="#F2F2F2" className="cursor-pointer" />}
                {musicPlayPattern === 1 && <ShuffleOne onClick={() => dispatch(setPattern())} theme="outline" size="26" fill="#F2F2F2" className="cursor-pointer" />}
                {musicPlayPattern === 2 && <PlayOnce onClick={() => dispatch(setPattern())} theme="outline" size="26" fill="#F2F2F2" className="cursor-pointer" />}

                <GoStart theme="outline" size="36" fill="#F2F2F2" className="cursor-pointer" />
                {musicState ? (
                  <PauseOne theme="outline" size="56" fill="#F2F2F2" className="cursor-pointer" onClick={() => window.audioDom.pause()} />
                ) : (
                  <Play theme="outline" size="56" fill="#F2F2F2" className="cursor-pointer" onClick={() => window.audioDom.play()} />
                )}
                <GoEnd theme="outline" size="36" fill="#F2F2F2" className="cursor-pointer" />

                <MusicList theme="outline" size="22" fill="#F2F2F2" className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
