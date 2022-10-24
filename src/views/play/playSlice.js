import { createSlice } from '@reduxjs/toolkit'

export const playSlice = createSlice({
  name: 'music',
  initialState: {
    src: '',//播放地址
    list: [], //音乐列表
    currentIndex: 0, //当前播放下标
    duration: 0, //总时长
    currentTime: 0, //当前播放进度
    playPattern: 0, //播放模式
    lyric: 0, //歌词
    detail: {},//音乐详情数据
  },
  reducers: {
    start: (state, action) => {
      state.src = action.payload
    },
    setDetail: (state, action) => {
      state.detail = action.payload
    }
  }
})

export const { start, setDetail } = playSlice.actions
export default playSlice.reducer