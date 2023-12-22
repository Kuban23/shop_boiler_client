import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'

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

// запрос одного товара по id
export const getBoilerPart = createEffect(async (url: string) => {
  const { data } = await api.get(url)

  return data
})

export const searchParts = createEffect(
  async ({ url, search }: { url: string; search: string }) => {
    const { data } = await api.post(url, { search })

    return data.rows
  }
)

export const getPartByName = createEffect(
  async ({ url, name }: { url: string; name: string }) => {
    try {
      const { data } = await api.post(url, { name })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
