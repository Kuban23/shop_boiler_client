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
export const updateCartItemTotalPrice = shoppingCart.createEvent<{
  partId: number
  total_price: number
}>()
// export const updateCartItemCount = shoppingCart.createEvent<{
//   partId: number
//   count: number
// }>()
export const setTotalPrice = shoppingCart.createEvent<number>()

const remove = (cartItems: IShoppingCartItem[], partId: number) =>
  cartItems.filter((item) => item.partId !== partId)

// const updateTotalPrice = (
//   cartItems: IShoppingCartItem[],
//   partId: number,
//   total_price: number
// ) =>
//   cartItems.map((item) => {
//     if (item.partId === partId) {
//       return {
//         ...item,
//         total_price,
//       }
//     }
//     return item
//   })

// const updateCount = (
//   cartItems: IShoppingCartItem[],
//   partId: number,
//   count: number
// ) =>
//   cartItems.map((item) => {
//     if (item.partId === partId) {
//       return {
//         ...item,
//         count,
//       }
//     }
//     return item
//   })

function updateCartItem<T>(
  cartItems: IShoppingCartItem[],
  partId: number,
  payload: T
) {
  return cartItems.map((item) => {
    if (item.partId === partId) {
      return {
        ...item,
        ...payload,
      }
    }

    return item
  })
}

// создаю событие
export const setShoppingCart = shoppingCart.createEvent<IShoppingCartItem[]>()

// создал состояние стора
export const $shoppingCart = shoppingCart
  .createStore<IShoppingCartItem[]>([])
  .on(setShoppingCart, (_, shoppingCart) => shoppingCart)
  .on(updateShoppingCart, (state, cartItem) => [...state, cartItem])
  .on(removeShoppingCartItem, (state, partId) => [...remove(state, partId)])
  .on(updateCartItemTotalPrice, (state, { partId, total_price }) => [
    ...updateCartItem(state, partId, { total_price }),
  ])
  .on(updateCartItemCount, (state, { partId, count }) => [
    ...updateCartItem(state, partId, { count }),
  ])

export const $totalPrice = shoppingCart
  .createStore<number>(0)
  .on(setTotalPrice, (_, value) => value)
