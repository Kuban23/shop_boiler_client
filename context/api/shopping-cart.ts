import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'
import { IAddToCart, IUpdateCartItem } from '@/types/shopping-cart'

export const getCartItems = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const addToCart = createEffect(
  async ({ url, username, partId }: IAddToCart) => {
    const { data } = await api.post(url, { username, partId })

    return data
  }
)

export const removeFromCart = createEffect(async (url: string) => {
  await api.delete(url)
})

export const updateCartItem = createEffect(
  async ({ url, payload }: IUpdateCartItem) => {
    const { data } = await api.patch(url, payload)

    return data
  }
)
