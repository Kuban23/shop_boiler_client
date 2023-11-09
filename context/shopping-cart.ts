import { createDomain } from 'effector-next'

import { IShoppingCartItem } from '@/types/shopping-cart'

// создал домен
const shoppingCart = createDomain()

export const updateCartItemCount = shoppingCart.createEvent<{
  partId: number
  count: number
}>()
export const removeShoppingCartItem = shoppingCart.createEvent<number>()
export const updateShoppingCart = shoppingCart.createEvent<IShoppingCartItem>()

const remove = (cartItems: IShoppingCartItem[], partId: number) =>
  cartItems.filter((item) => item.partId !== partId)

// создаю событие
export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()

// создал состояние стора
export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItem[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCartItem, (state, partId) => [...remove(state, partId)])
