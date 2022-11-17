import { createSlice } from '@reduxjs/toolkit'
import { Toast } from 'antd-mobile'
const patternList = ['顺序播放', '随机播放', '单曲循环']

export const playSlice = createSlice({
  name: 'music',
  initialState: {
    musicState: false, //当前状态
    musicSrc: '', //播放地址
    musicList: [], //音乐列表
    musicCurrentIndex: 0, //当前播放下标
    musicCuration: 0, //总时长
    musicCurrentTime: 0, //当前播放进度
    musicPlayPattern: 0, //播放模式 0顺序播放 1随机播放 2单曲循环
    musicLyric: 0, //歌词
    musicDetail: {}, //音乐详情数据
  },
  reducers: {
    setSrc: (state, action) => {
      state.musicSrc = action.payload
    },
    setDetail: (state, action) => {
      state.musicDetail = action.payload
    },
    setMusicState: (state, action) => {
      state.musicState = action.payload
    },
    setMusicCurrentTime: (state, action) => {
      state.musicCurrentTime = action.payload
    },

    //播放模式
    setPattern: (state) => {
      if (state.musicPlayPattern === 2) {
        state.musicPlayPattern = 0
      } else {
        state.musicPlayPattern = state.musicPlayPattern + 1
      }

      Toast.show(patternList[state.musicPlayPattern])
    },

    addOneMusic: (state, action) => {
      state.musicList.push({ ...action.payload })
    },
  },
})

export const { setSrc, setDetail, setMusicState, setMusicCurrentTime, setPattern, addOneMusic } = playSlice.actions
export default playSlice.reducer
