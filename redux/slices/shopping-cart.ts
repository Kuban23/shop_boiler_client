import { IShoppingCartItem } from '@/types/shopping-cart'
import { createSlice } from '@reduxjs/toolkit'

interface CartSliceState {
  items: IShoppingCartItem[]
}

const initialState: CartSliceState = {
  items: [],
}

export const shoppingCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setShoppingCart: (state, action) => action.payload,
  },
})

export const { setShoppingCart } = shoppingCartSlice.actions

export default shoppingCartSlice.reducer
