import { configureStore } from '@reduxjs/toolkit'

import authSliceReducer from './slices/auth'
import themeReducer from './slices/modeTheme'
import shoppingCartReducer from './slices/shopping-cart'

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    theme: themeReducer,
    cart: shoppingCartReducer,
  },
})

export default store
