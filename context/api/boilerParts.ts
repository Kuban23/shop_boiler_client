import { createEffect } from 'effector-next'

import api from '@/app/axiosClient'

// запрос бесцеллеров
export const getBestsellersOrNewParts = createEffect(async (url: string) => {
  const { data } = await api.get(url)
  return data
})

// запрос товара для каталога
export const getBoilerParts = createEffect(async (url: string) => {
  const { data } = await api.get(url)
  return data
})
