import { IUser } from '@/types/auth'
import { createDomain } from 'effector-next'

// создал домен
const user = createDomain()

// создаю события
export const setUser = user.createEvent<IUser>()
export const setUserCity = user.createEvent<{ city: string; street: string }>()

// создал состояние стора
export const $user = user
  .createStore<IUser>({} as IUser)
  .on(setUser, (_, user) => user)

// создал состояние стора
export const $userCity = user
  .createStore({ city: '', street: '' })
  .on(setUserCity, (_, city) => city)
