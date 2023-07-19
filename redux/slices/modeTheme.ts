import { createSlice } from '@reduxjs/toolkit'

// пытаемся получить тему из локального хранилища браузера
// если там ничего нет, то пробуем получить тему из настроек системы
// если и настроек нет, то используем темную тему
// const getTheme = () => {
//   if (typeof window !== 'undefined') {
//     // код, который выполнится только в браузере
//     const theme = `${window?.localStorage?.getItem('mode')}`
//     if (['light', 'dark'].includes(theme)) return theme

//     const userMedia = window.matchMedia('(prefers-color-scheme: light)')
//     if (userMedia.matches) return 'light'
//   } else {
//     // код, который выполнится только на сервере
//     return 'dark'
//   }
// }
interface FilterSliceState {
  mode: string
}

const initialState: FilterSliceState = {
  mode: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode: (state, action) => action.payload,
  },
})

export const { setMode } = themeSlice.actions

export default themeSlice.reducer
