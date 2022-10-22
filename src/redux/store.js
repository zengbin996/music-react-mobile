import { configureStore } from '@reduxjs/toolkit'
import playSlice from '../views/play/playSlice'


export default configureStore({
  reducer: {
    play: playSlice
  }
})