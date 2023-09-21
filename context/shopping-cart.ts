import { createDomain } from 'effector-next'

import { IShoppingCartItem } from '@/types/shopping-cart'

// создал домен
const shoppingCart = createDomain()

// создаю событие
export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()

// создал состояние стора
export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItem[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
