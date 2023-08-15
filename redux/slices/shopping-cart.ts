import { IShoppingCartItem } from '@/types/shopping-cart'
import { createSlice } from '@reduxjs/toolkit'

// interface IShoppingCartItem {
//   id: number
//   name: string
//   price: number
//   image: string
//   in_stock: number
//   parts_manufacturer: string
//   boiler_manufacturer: string
//   count: number
//   total_price: number
//   userId: number
//   partId: number
// }

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
