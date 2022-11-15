import { createSlice } from '@reduxjs/toolkit';

export const tabBarSlice = createSlice({
  name: 'tabBar',
  initialState: {
    buttonBar: true, //底部导航栏
    controlBar: true, //音乐控制器
  },

  reducers: {
    setBBar: (state, action) => {
      state.buttonBar = action.payload;
    },
    setCBar: (state, action) => {
      state.controlBar = action.payload;
    },
  },
});

export const { setBBar, setCBar } = tabBarSlice.actions;
export default tabBarSlice.reducer;
