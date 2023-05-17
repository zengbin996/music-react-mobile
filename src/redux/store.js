import { configureStore } from '@reduxjs/toolkit';
import tabBar from './tabBar';
import play from './play';

export default configureStore({
  reducer: {
    tabBar,
    play,
  },
});
