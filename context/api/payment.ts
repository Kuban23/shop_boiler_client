import { createEffect } from 'effector-next'
import api from '@/app/axiosClient'
import { ICheckPay, IMakePay } from '@/types/order'

export const makePayment = createEffect(
  async ({ url, amount, description }: IMakePay) => {
    const { data } = await api.post(url, { amount, description })

    return data
  }
)

export const checkPayment = createEffect(
  async ({ url, paymentId }: ICheckPay) => {
    const { data } = await api.post(url, { paymentId })

    return data
  }
)
