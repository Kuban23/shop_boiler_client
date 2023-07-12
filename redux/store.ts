import { configureStore } from '@reduxjs/toolkit'

import authSliceReducer from './slices/auth'

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
})

export default store
