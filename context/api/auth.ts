import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { HTTPStatus } from '@/constants'

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

// метод проверки пользователя
export const checkUserAuth = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url)
    return data
  } catch (error) {
    const axiosError = error as AxiosError
    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }
    toast.error((error as Error).message)
  }
})

// метод выхода пользователя
export const logOut = createEffect(async (url: string) => {
  try {
    await api.get(url)
  } catch (error) {
    toast.error((error as Error).message)
  }
})
