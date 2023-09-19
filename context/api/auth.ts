import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'

import api from '@/app/axiosClient'
import { ISignUp } from '@/types/auth'

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
