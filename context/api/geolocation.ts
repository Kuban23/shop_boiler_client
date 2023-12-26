/* eslint-disable max-len */
import { createEffect } from 'effector-next'

import api from '../../app/axiosClient'
import { IGeolocation } from '@/types/common'

export const getGeolocation = createEffect(
  async ({ latitude, longitude }: IGeolocation) => {
    const data = await api.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,
      { withCredentials: false }
    )
    return data
  }
)
