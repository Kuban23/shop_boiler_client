import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'
import { IMakePay } from '@/types/order'

export const makePayment = createEffect(async ({ url, amount }: IMakePay) => {
  const { data } = await api.post(url, { amount })

  return data
})
