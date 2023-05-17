import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Toast } from 'antd-mobile';

const PATTERN = [
  {
    title: '顺序播放',
    value: 1,
  },
  {
    title: '随机播放',
    value: 2,
  },
  {
    title: '单曲循环',
    value: 3,
  },
];

export const startAsync = createAsyncThunk('start', async id => {
  const result = await Promise.all([
    axios.get('/song/url', { params: { id } }),
    axios.get('/song/detail', { params: { ids: id } }),
    axios.get('/lyric', { params: { id: id } }),
  ]);

  return result;
});

export const playSlice = createSlice({
  name: 'play',
  initialState: {
    list: [], //播放列表
    current: 0, //当前下标
    src: {}, //播放地址
    paused: true, //是否暂停
    duration: 0, //总时长
    currentTime: 0, //当前进度
    pattern: 1, //播放模式
    lyric: '', //歌词
    detail: {}, //其他数据
  },
  reducers: {
    // 播放暂停
    start: (state, action) => {
      state.paused = !action.payload;
    },

    //更新播放时间
    updateTime: (state, action) => {
      state.currentTime = action.payload;
    },

    //播放模式
    changePattern: state => {
      if (state.pattern === 2) {
        state.pattern = 0;
      } else {
        state.pattern = state.pattern + 1;
      }
      Toast.show(PATTERN[state.pattern].title);
    },

    navigateM: (state, action) => {
      if (action.payload === 1) {
        if (state.list.length > state.current) {
          state.current += 1;
        } else {
          state.current = 0;
        }
      }
    },

    //修改播放列表 action 参数 type 1替换 2插入
    setList(state, action) {
      if (action.payload.type === 1) {
        state.list = action.payload.list;
        state.current = action.payload.index || 0;
      }

      if (action.payload.type === 2) {
        state.list.splice(state.current, 0, action.payload.list);
      }
    },

    //下一首
    nextOne(state) {
      if (state.current === state.list.length - 1) {
        state.current = 0;
      } else {
        state.current += 1;
      }
    },

    //上一首
    lastOne(state) {
      if (state.current === 0) {
        state.current = state.list.length - 1;
      } else {
        state.current -= 1;
      }
    },

    navIndex(state, action) {
      state.current = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(startAsync.fulfilled, (state, action) => {
      state.src = action.payload[0].data[0];
      state.detail = action.payload[1].songs[0];
      state.lyric = action.payload[2];
    });
  },
});

export const { start, updateTime, changePattern, setList, nextOne, lastOne, navIndex } = playSlice.actions;
export default playSlice.reducer;
