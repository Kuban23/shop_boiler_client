import React from 'react'
import { useStore } from 'effector-react'
//import { useSelector, useDispatch } from 'react-redux'

import { setMode, $mode } from '../context/mode'
// import { setMode } from '../redux/slices/modeTheme'

export const useTheme = () => {
  // достаю стор-состояние
  const mode = useStore($mode)

  //ig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const mode = useSelector((state: any) => state.theme)
  // const dispatch = useDispatch()

  // Функция для смены темы
  const toggleTheme = () => {
    if (mode === 'dark') {
      localStorage.setItem('mode', JSON.stringify('light'))
      setMode('light')
    } else {
      localStorage.setItem('mode', JSON.stringify('dark'))
      setMode('dark')
    }
  }

  React.useEffect(() => {
    const localTheme = JSON.parse(localStorage.getItem('mode') as string)
    if (localTheme) {
      setMode(localTheme)
    }
  }, [])
  return { toggleTheme }
}
