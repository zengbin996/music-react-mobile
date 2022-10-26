import { createSlice } from '@reduxjs/toolkit';

export const playSlice = createSlice({
  name: 'music',
  initialState: {
    state: false, //当前状态
    src: '', //播放地址
    list: [], //音乐列表
    currentIndex: 0, //当前播放下标
    duration: 0, //总时长
    currentTime: 0, //当前播放进度
    playPattern: 0, //播放模式 0顺序播放 1随机播放 2单曲循环
    lyric: 0, //歌词
    detail: {}, //音乐详情数据
  },
  reducers: {
    start: (state, action) => {
      state.src = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
    switchState: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { start, setDetail, switchState } = playSlice.actions;
export default playSlice.reducer;
