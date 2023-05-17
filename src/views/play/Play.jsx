import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavBar, ProgressBar, Swiper, Popup, List } from 'antd-mobile';
import { DownOutline, HeartFill, HeartOutline } from 'antd-mobile-icons';
import {
  PlayCycle,
  PlayOnce,
  ShuffleOne,
  GoStart,
  Play,
  PauseOne,
  GoEnd,
  MusicList,
  Comment,
  VipOne,
} from '@icon-park/react';
import { startAsync, changePattern, nextOne, lastOne, navIndex, setList } from '../../redux/play';
import { setBBar, setCBar } from '../../redux/tabBar';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export default function Counter() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  //隐藏tabBar
  useEffect(() => {
    dispatch(setBBar(false));
    dispatch(setCBar(false));
    return () => {
      dispatch(setBBar(true));
      dispatch(setCBar(true));
    };
  }, []);

  const play = useSelector(state => state.play);

  useEffect(() => {
    if (!play.list.length) {
      dispatch(setList({ list: { id }, type: 2 }));
    }
  }, []);

  const back = () => {
    navigate(-1);
  };

  //三个选项卡
  const [currentNav, setCurrentNav] = useState(1);
  const getNavBarClass = index => {
    if (index === currentNav) {
      return 'px-2 cursor-pointer text-white/90';
    }
    return 'px-2 cursor-pointer';
  };
  //轮播图
  const swiperRef = useRef();

  //点击顶部导航
  const clickNav = index => {
    setCurrentNav(index);
    swiperRef.current.swipeTo(index);
  };

  //专辑宽度设置
  // const [albumWidth, setAlbumWidth] = useState(0)
  // const albumCover = useRef()

  //歌词处理
  const [lyric, setLyric] = useState('');
  const [lyricList, setLyricList] = useState([]);

  let current = {};
  let list = [];
  if (play.lyric) {
    list = play.lyric.lrc.lyric.split('\n');
    list.pop();

    list = list.map(item => {
      let time = item.match(/\[(\S*)\]/)[1];
      time =
        dayjs
          .duration({
            m: time.substr(0, 2),
            s: time.substr(3, 2),
            ms: time.substr(6),
          })
          .asSeconds() * 1000;

      return { time, txt: item.substr(item.indexOf(']') + 1) };
    });

    if (list.length === 1) {
      current = list[0];
    } else {
      current = list[list.findIndex(item => item.time > play.currentTime) - 1];
    }
  }

  useEffect(() => {
    if (current) setLyric(current.txt);
    setLyricList(list);
  }, [play.currentTime]);

  //切换歌曲
  const goNav = index => {
    if (index === 1) {
      dispatch(nextOne());
    } else {
      dispatch(lastOne());
    }
  };

  //播放列表
  const [popupVisible, setPopupVisible] = useState(false);
  const playMusicHandle = item => {
    const current = play.list.findIndex(a => a.id === item.id);
    dispatch(navIndex(current));
  };

  if (!play.detail.name) return null;

  return (
    <div
      className="h-full bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${play.detail.al.picUrl}?imageView=1&type=webp&thumbnail=750x750)` }}
    >
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

        <Swiper
          ref={swiperRef}
          indicator={() => null}
          onIndexChange={index => clickNav(index)}
          defaultIndex={1}
          className="flex-1 text-white"
        >
          <Swiper.Item>
            <div className="p-4">暂无推荐</div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="h-full px-6 text-white/90 flex flex-col justify-between">
              <img
                src={`${play.detail.al.picUrl}?imageView=1&type=webp&thumbnail=750x750`}
                alt={play.detail.name}
                className="m-auto rounded-xl w-full"
              />
              {/* ref={albumCover} */}
              {/* style={{ height: albumCover.current && albumCover.current.wi }} */}

              <div className="flex-1 flex flex-col justify-between pb-16">
                <div className="py-8">
                  <div className="flex justify-between">
                    <div className="text-xl">{play.detail.name}</div>
                    <div>
                      <HeartFill fontSize={26} className="cursor-pointer" onClick={() => lick()} />
                      {/* <HeartOutline fontSize={26} /> */}
                    </div>
                  </div>
                  <div className="text-sm py-2 text-gray-300">{play.detail.ar.map(item => item.name).join('，')}</div>
                  <div className="mt-2"> {lyric}</div>
                </div>

                <div>
                  <div className="mb-4 flex flex-row-reverse">
                    <Comment theme="outline" size="24" fill="#F2F2F2" onClick={() => navigate(`/play/comment/${id}`)} />
                  </div>
                  <div className="pb-6">
                    <ProgressBar
                      percent={(play.currentTime / play.detail.dt) * 100}
                      style={{
                        '--track-width': '2px',
                        '--fill-color': '#F1F5F9',
                        '--track-color': '#FFFFFF22',
                      }}
                    />
                    <div className="flex justify-between mt-2">
                      <span>{dayjs.duration(play.currentTime).format('mm:ss')}</span>
                      <span>{dayjs.duration(play.detail.dt).format('mm:ss')}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    {play.pattern === 0 && (
                      <PlayCycle
                        onClick={() => dispatch(changePattern())}
                        theme="outline"
                        size="26"
                        fill="#F2F2F2"
                        className="cursor-pointer"
                      />
                    )}
                    {play.pattern === 1 && (
                      <ShuffleOne
                        onClick={() => dispatch(changePattern())}
                        theme="outline"
                        size="26"
                        fill="#F2F2F2"
                        className="cursor-pointer"
                      />
                    )}
                    {play.pattern === 2 && (
                      <PlayOnce
                        onClick={() => dispatch(changePattern())}
                        theme="outline"
                        size="26"
                        fill="#F2F2F2"
                        className="cursor-pointer"
                      />
                    )}

                    <GoStart
                      theme="outline"
                      size="36"
                      fill="#F2F2F2"
                      className="cursor-pointer"
                      onClick={() => goNav(-1)}
                    />

                    {play.paused ? (
                      <Play
                        theme="outline"
                        size="56"
                        fill="#F2F2F2"
                        className="cursor-pointer"
                        onClick={() => window.audioDom.play()}
                      />
                    ) : (
                      <PauseOne
                        theme="outline"
                        size="56"
                        fill="#F2F2F2"
                        className="cursor-pointer"
                        onClick={() => window.audioDom.pause()}
                      />
                    )}
                    <GoEnd
                      theme="outline"
                      size="36"
                      fill="#F2F2F2"
                      className="cursor-pointer"
                      onClick={() => goNav(1)}
                    />

                    <MusicList
                      onClick={() => setPopupVisible(true)}
                      theme="outline"
                      size="22"
                      fill="#F2F2F2"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div className="px-8 h-full overflow-auto text-base">
              {lyricList.map((item, index) => {
                return <div key={index}>{item.txt}</div>;
              })}
            </div>
          </Swiper.Item>
        </Swiper>

        <Popup
          visible={popupVisible}
          onMaskClick={() => {
            setPopupVisible(false);
          }}
          bodyStyle={{ height: '80vh' }}
          position="bottom"
        >
          <List header="播放列表" className="overflow-auto h-full">
            {play.list[0].name &&
              play.list.map(item => (
                <List.Item key={item.id} onClick={() => playMusicHandle(item)}>
                  <div className={play.list[play.current].id == item.id ? 'text-red-500' : ''}>
                    <div>
                      {item.name} {item.fee == 1 && <VipOne theme="outline" size="16" fill="#f00" />}
                    </div>
                    <div className="text-sm line-clamp-1">
                      {/* {item.ar.map((a) => a.name).join('，')} */}
                      {/* {item.alia[0] && ` - ${item.alia[0]}`} */}
                    </div>
                  </div>
                </List.Item>
              ))}
            ;
          </List>
        </Popup>
      </div>
    </div>
  );
}
