import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'

import api from '@/app/axiosClient'
import { ISignIn, ISignUp } from '@/types/auth'

// метод для регистрации
export const singUp = createEffect(
  async ({ url, username, password, email }: ISignUp) => {
    const { data } = await api.post(url, { username, password, email })
    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }
    toast.success('Регистрация прошла успешно!')
    return data
  }
)

// метод для залогивания
export const singIn = createEffect(
  async ({ url, username, password }: ISignIn) => {
    const { data } = await api.post(url, { username, password })
    toast.success('Вход успешно выполнен!')
    return data
  }
)
