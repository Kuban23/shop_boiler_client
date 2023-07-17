import { configureStore } from '@reduxjs/toolkit'

import authSliceReducer from './slices/auth'
import themeReducer from './slices/modeTheme'

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    theme: themeReducer,
  },
})

export default store
