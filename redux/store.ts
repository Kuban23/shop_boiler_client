import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import authSliceReducer from './slices/auth'
import themeReducer from './slices/modeTheme'
import shoppingCartReducer from './slices/shopping-cart'
import bestsellersReducer from './slices/boilerParts'

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    theme: themeReducer,
    cart: shoppingCartReducer,
    bestsellers: bestsellersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export default store
