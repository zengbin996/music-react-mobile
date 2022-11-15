import { configureStore } from '@reduxjs/toolkit';
import playSlice from './playMusic';
import tabBar from './tabBar';

export default configureStore({
  reducer: {
    play: playSlice,
    tabBar,
  },
});
